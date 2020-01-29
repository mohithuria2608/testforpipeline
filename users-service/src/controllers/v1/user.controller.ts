import * as Constant from '../../constant'
import { consolelog, formatUserData } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService } from '../../grpc/client';

export class UserController {
    constructor() { }

    /**
     * @description sync user to cms and sdm coming from KAFKA
     * @param {IKafkaGrpcRequest.IKafkaBody} payload 
     */
    async syncUser(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {

                }
                if (payload.as.update) {
                    data['id'] = data.userId
                    ENTITY.UserE.buildUser(data)
                }
            }
            if (payload.cms.create || payload.cms.update || payload.cms.get) {
                if (payload.cms.create)
                    ENTITY.UserE.createUserOnCms(data)
                if (payload.cms.update)
                    ENTITY.UserE.updateUserOnCms(data)
            }
            if (payload.sdm.create || payload.sdm.update || payload.sdm.get) {
                if (payload.sdm.create)
                    ENTITY.UserE.createUserOnSdm(data)
                if (payload.sdm.update)
                    ENTITY.UserE.updateUserOnSdm(data)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} cCode : country code with +, eg: +976
    * */
    async loginSendOtp(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthSendOtp) {
        try {
            const fullPhnNo = payload.cCode + payload.phnNo;
            const username = headers.brand + "_" + fullPhnNo
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "username",
                    value: username
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (checkUser && checkUser.length > 0) {
                let userchange: IUserchangeRequest.IUserchange = {
                    fullPhnNo: fullPhnNo,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isGuest: 0
                }
                await ENTITY.UserchangeE.buildUserchange(checkUser[0].id, userchange)
            } else {
                let tempUser: IUserRequest.IUserData = {
                    id: ENTITY.UserE.ObjectId().toString(),
                    cartId: ENTITY.UserE.ObjectId().toString(),
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    phnVerified: 0,
                    brand: headers.brand,
                    country: headers.country,
                }
                let user = await ENTITY.UserE.buildUser(tempUser)
                let userchange: IUserchangeRequest.IUserchange = {
                    username: username,
                    fullPhnNo: fullPhnNo,
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    brand: headers.brand,
                    country: headers.country,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isGuest: 0
                }
                await ENTITY.UserchangeE.buildUserchange(user.id, userchange)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "loginSendOtp", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} cCode : country code with +, eg: +976
    * @param {number} otp : 4 digit otp
    * @param {number} isGuest : guest checkout
    * */
    async verifyOtp(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthVerifyOtp) {
        try {
            let userData: IUserRequest.IUserData
            let deleteUserId = ""
            const fullPhnNo = payload.cCode + payload.phnNo;
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "fullPhnNo",
                    value: fullPhnNo
                },
                set: ENTITY.UserchangeE.set,
                background: false,
            }
            let userchange: IUserchangeRequest.IUserchange[] = await Aerospike.query(queryArg)
            if (userchange && userchange.length > 0) {
                await ENTITY.UserchangeE.validateOtpOnPhnChange(payload, userchange[0])
                let userUpdate = {
                    id: userchange[0].id,
                    phnVerified: 1,
                }
                if (userchange[0].fullPhnNo)
                    userUpdate['fullPhnNo'] = userchange[0].fullPhnNo
                if (userchange[0].username)
                    userUpdate['username'] = userchange[0].username
                if (userchange[0].cCode)
                    userUpdate['cCode'] = userchange[0].cCode
                if (userchange[0].phnNo)
                    userUpdate['phnNo'] = userchange[0].phnNo
                if (userchange[0].name)
                    userUpdate['name'] = userchange[0].name
                if (userchange[0].email)
                    userUpdate['email'] = userchange[0].email
                if (userchange[0].socialKey)
                    userUpdate['socialKey'] = userchange[0].socialKey
                if (userchange[0].medium)
                    userUpdate['medium'] = userchange[0].medium
                if (userchange[0].cartId)
                    userUpdate['cartId'] = userchange[0].cartId
                if (userchange[0].isGuest != undefined)
                    userUpdate['isGuest'] = userchange[0].isGuest
                if (userchange[0].profileStep != undefined)
                    userUpdate['profileStep'] = userchange[0].profileStep
                if (userchange[0].brand)
                    userUpdate['brand'] = userchange[0].brand
                if (userchange[0].country)
                    userUpdate['country'] = userchange[0].country
                if (userchange[0].deleteUserId)
                    deleteUserId = userchange[0].deleteUserId
                userData = await ENTITY.UserE.buildUser(userUpdate)
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
            }
            if (deleteUserId && deleteUserId != "") {
                await Aerospike.remove({ set: ENTITY.UserE.set, key: deleteUserId })
                await ENTITY.SessionE.removeAllSessionRelatedToUserId(deleteUserId)
            }
            let sessionUpdate: ISessionRequest.ISession = {
                isGuest: payload.isGuest,
                userId: userData.id,
            }
            let session = await ENTITY.SessionE.buildSession(headers, sessionUpdate)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                userchange[0].id,
                payload.isGuest,
                session.sessionTime
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(userData, headers) }
        } catch (error) {
            consolelog(process.cwd(), "loginVerifyOtp", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @param {string} socialKey : social id
    * @param {string} medium : Social Platform type : FB, GOOGLE
    * */
    async socialAuthValidate(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthSocial) {
        try {
            let userData: IUserRequest.IUserData = {}
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.USER.check_social_key,
                    args: [headers.brand, headers.country, payload.medium, payload.socialKey],
                    forEach: true
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let userObj: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (userObj && userObj.length > 0) {
                userData = userObj[0]
                let userUpdate: IUserRequest.IUserData = {
                    id: userObj[0].id,
                    name: payload.name,
                }
                if (payload.email)
                    userUpdate['email'] = payload.email
                if (userObj[0].phnVerified == 1) {
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                } else {
                    let userchange: IUserchangeRequest.IUserchange = {
                        fullPhnNo: userData.fullPhnNo,
                        cCode: userData.cCode,
                        phnNo: userData.phnNo,
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        brand: headers.brand,
                        country: headers.country,
                    }
                    await ENTITY.UserchangeE.buildUserchange(userData.id, userchange)
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                }
            } else {
                let tempUser: IUserRequest.IUserData = {
                    id: ENTITY.UserE.ObjectId().toString(),
                    cartId: ENTITY.UserE.ObjectId().toString(),
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    phnVerified: 0,
                    socialKey: payload.socialKey,
                    brand: headers.brand,
                    country: headers.country,
                    medium: payload.medium,
                    name: payload.name,
                    email: payload.email ? payload.email : "",
                }
                userData = await ENTITY.UserE.buildUser(tempUser)
            }
            let sessionUpdate: ISessionRequest.ISession = {
                isGuest: 0,
                userId: userData.id,
            }
            let session = await ENTITY.SessionE.buildSession(headers, sessionUpdate)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                userData.id,
                0,
                session.sessionTime
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(userData, headers) }
        } catch (error) {
            consolelog(process.cwd(), "socialAuthValidate", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method PATCH
    * @param {string} cCode : country code with +, eg: +976
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} email : email
    * @param {string} name : name
    * */
    async createProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.ICreateProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            const fullPhnNo = payload.cCode + payload.phnNo;
            const username = headers.brand + "_" + fullPhnNo;
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            if (userData && userData.id) {
                if (userData && userData.id && userData.profileStep && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PROFILE_SETUP_ALLREADY_COMPLETE)
                if (userData.socialKey && userData.medium) {
                    let queryArg: IAerospike.Query = {
                        equal: {
                            bin: "username",
                            value: username
                        },
                        set: ENTITY.UserE.set,
                        background: false,
                    }
                    let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                    consolelog(process.cwd(), "checkUser", JSON.stringify(checkUser), false)
                    let userchangePayload = {
                        username: username,
                        fullPhnNo: fullPhnNo,
                        name: payload.name,
                        email: payload.email,
                        cCode: payload.cCode,
                        phnNo: payload.phnNo,
                        medium: userData.medium,
                        socialKey: userData.socialKey,
                        otp: Constant.SERVER.BY_PASS_OTP,
                        cartId: userData.cartId,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isGuest: 0,
                        profileStep: 1,
                        brand: headers.brand,
                        country: headers.country,
                    }
                    if (checkUser && checkUser.length > 0) {
                        userchangePayload['id'] = checkUser[0].id
                        userchangePayload['deleteUserId'] = auth.id
                        await ENTITY.UserchangeE.buildUserchange(checkUser[0].id, userchangePayload)
                    } else {
                        userchangePayload['id'] = auth.id
                        userchangePayload['deleteUserId'] = ""
                        await ENTITY.UserchangeE.buildUserchange(auth.id, userchangePayload)
                    }
                    userData['fullPhnNo'] = fullPhnNo
                    userData['phnNo'] = payload.phnNo
                    userData['cCode'] = payload.cCode
                    userData['profileStep'] = 1
                    userData['phnVerified'] = 0
                    return formatUserData(userData, headers)
                } else {
                    let userUpdate: IUserRequest.IUserData = {
                        id: userData.id,
                        name: payload.name,
                        email: payload.email,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    }
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                    let userSync: IKafkaGrpcRequest.IKafkaBody = {
                        set: ENTITY.UserE.set,
                        sdm: {
                            create: true,
                            argv: JSON.stringify(userData)
                        },
                        cms: {
                            create: true,
                            argv: JSON.stringify(userData)
                        },
                    }
                    kafkaService.kafkaSync(userSync)
                    return formatUserData(userData, headers)
                }
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.USER_NOT_FOUND)
            }
        } catch (error) {
            consolelog(process.cwd(), "profileUpdate", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method PATCH
    * @param {string=} email : email
    * @param {string=} name : name
    * @param {string=} cCode : country code
    * @param {string=} phnNo : phone number
    * */
    async editProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.IEditProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            let dataToUpdate = {
                id: userData.id,
            }
            if (payload.name)
                dataToUpdate['name'] = payload.name
            if (payload.email)
                dataToUpdate['email'] = payload.email
            if (payload.cCode && payload.phnNo) {
                const fullPhnNo = payload.cCode + payload.phnNo;
                const username = headers.brand + "_" + fullPhnNo;
                let userchangePayload = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    brand: headers.brand,
                    country: headers.country,
                }
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "username",
                        value: username
                    },
                    set: ENTITY.UserE.set,
                    background: false,
                }
                let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                if (checkUser && checkUser.length > 0) {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_ALREADY_EXIST)
                }
                await ENTITY.UserchangeE.buildUserchange(userData.id, userchangePayload)
            }
            let user = await ENTITY.UserE.buildUser(dataToUpdate)
            // ENTITY.UserE.syncUser(user)
            if (payload.cCode && payload.phnNo) {
                user['fullPhnNo'] = payload.cCode + payload.phnNo
                user['phnNo'] = payload.phnNo
                user['cCode'] = payload.cCode
                user['phnVerified'] = 0
            }
            return formatUserData(user, headers)
        } catch (error) {
            consolelog(process.cwd(), "editProfile", error, false)
            return Promise.reject(error)
        }
    }
}

export const userController = new UserController();