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
    async syncUserFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {

                }
                if (payload.as.update)
                    ENTITY.UserE.updateUser(data.userId, { cartId: data.cartId })
            }
            if (payload.cms.create || payload.cms.update || payload.cms.get) {
                if (payload.cms.create)
                    ENTITY.UserE.createUserOnCms(data)
            }
            if (payload.sdm.create || payload.sdm.update || payload.sdm.get) {
                if (payload.sdm.create)
                    ENTITY.UserE.createUserOnSdm(data)
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
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.USER.check_phone_exist,
                    args: [payload.cCode],
                    forEach: true
                },
                equal: {
                    bin: "phnNo",
                    value: payload.phnNo
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (checkUser && checkUser.length > 0) {
                let otp = Constant.SERVER.BY_PASS_OTP
                let otpExpAt = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                let session = {
                    otp: otp,
                    otpExpAt: otpExpAt,
                    otpVerified: 0,
                    isGuest: 0,
                    isLogin: 0,
                    // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                }
                await ENTITY.SessionE.buildSession(headers, session, checkUser[0])
                if (checkUser[0].changePhnNo == 1) {
                    let userUpdate = { changePhnNo: 0 }
                    await ENTITY.UserE.updateUser(checkUser[0].id, userUpdate)
                    await Aerospike.remove({ set: ENTITY.UserchangeE.set, key: checkUser[0].id })
                }
            } else {
                let userCreate: IUserRequest.IUserUpdate = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    phnVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    isGuest: 0,
                }
                let userInCms = await ENTITY.UserE.checkUserOnCms({})
                if (userInCms && userInCms.id) {
                    userCreate['cmsUserRef'] = userInCms.id
                    if (userInCms['sdmUserRef'])
                        userCreate['sdmUserRef'] = userInCms.id
                    userCreate['name'] = userInCms.name
                    userCreate['email'] = userInCms.email
                    userCreate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                } else {
                    let userInSdm = await ENTITY.UserE.checkUserOnSdm({})
                    if (userInSdm && userInSdm.id) {
                        userCreate['sdmUserRef'] = userInSdm.id
                        userCreate['name'] = userInCms.name
                        userCreate['email'] = userInCms.email
                        userCreate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    }
                }
                let user = await ENTITY.UserE.createUser(headers, userCreate)
                let session = {
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isGuest: 0,
                    isLogin: 0,
                    createdAt: new Date().getTime(),
                    updatedAt: new Date().getTime(),
                    // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                }
                await ENTITY.SessionE.buildSession(headers, session, user)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(), "loginSendOtp", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} cCode : country code with +, eg: +976
    * @param {number} otp : 4 digit otp
    * @param {boolean} isGuest : which screen the user is coming from (guestcheckout-verifyotp)
    * @param {boolean} isSocialLogin : which screen the user is coming from (sociallogin-createprofile-verifyotp)
    * */
    async verifyOtp(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthVerifyOtp) {
        try {
            let deleteUserId = ""
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.USER.check_phone_exist,
                    args: [payload.cCode],
                    forEach: true
                },
                equal: {
                    bin: "phnNo",
                    value: payload.phnNo
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let user: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (user && user.length > 0) {
                if (user.length >= 2) {
                    return Promise.reject("Same phone number used more than once")
                }
                let userUpdate: IUserRequest.IUserUpdate = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    phnVerified: 1,
                    changePhnNo: 0,
                }
                if (user[0] && user[0].id && user[0].changePhnNo == 1) {
                    let userchange = await ENTITY.UserchangeE.validateOtpOnPhnChange(payload, user[0])
                    if (userchange.cCode)
                        userUpdate['cCode'] = userchange.cCode
                    if (userchange.phnNo)
                        userUpdate['phnNo'] = userchange.phnNo
                    if (userchange.cartId)
                        userUpdate['cartId'] = userchange.cartId
                    if (userchange.name)
                        userUpdate['name'] = userchange.name
                    if (userchange.email)
                        userUpdate['email'] = userchange.email
                    if (userchange.socialKey)
                        userUpdate['socialKey'] = userchange.socialKey
                    if (userchange.medium)
                        userUpdate['medium'] = userchange.medium
                    if (userchange.cCode && userchange.phnNo && userchange.email && userchange.name)
                        userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    if (userchange && userchange.deleteUserId && userchange.deleteUserId != "")
                        deleteUserId = userchange.deleteUserId
                } else {
                    await ENTITY.SessionE.validateOtp(headers, payload, user[0])
                }
                user[0] = await ENTITY.UserE.updateUser(user[0].id, userUpdate)
                let sessionUpdate: ISessionRequest.ISession = {
                    otp: 0,
                    otpExpAt: 0,
                    otpVerified: 1,
                    isLogin: 1
                }
                await ENTITY.SessionE.buildSession(headers, sessionUpdate, user[0])
                // if (deleteUserId && deleteUserId != "") {
                //     await Aerospike.remove({ set: ENTITY.UserE.set, key: deleteUserId })
                //     await ENTITY.SessionE.removeAllSessionRelatedToUserId(deleteUserId)
                // }
                // let tokens = await ENTITY.UserE.getTokens(
                //     headers.deviceid,
                //     headers.devicetype,
                //     [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                //     user[0].id,
                //     0
                // )
                // return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user[0], headers.deviceid, headers.country, headers.language) }
            } else {
                let queryArg: IAerospike.Query = {
                    udf: {
                        module: 'user',
                        func: Constant.UDF.USER.check_phone_exist,
                        args: [payload.cCode],
                        forEach: true
                    },
                    equal: {
                        bin: "phnNo",
                        value: payload.phnNo
                    },
                    set: ENTITY.UserchangeE.set,
                    background: false,
                }
                let userchange: IUserchangeRequest.IUserchange[] = await Aerospike.query(queryArg)
                if (userchange && userchange.length > 0) {
                    if (userchange[0].deleteUserId)
                        deleteUserId = userchange[0].deleteUserId
                    user[0] = await ENTITY.UserE.getUser({ userId: userchange[0].id })
                    await ENTITY.UserchangeE.validateOtpOnPhnChange(payload, user[0])
                    let userUpdate: IUserRequest.IUserUpdate = {
                        cCode: payload.cCode,
                        phnNo: payload.phnNo,
                        phnVerified: 1,
                        changePhnNo: 0,
                    }
                    user[0] = await ENTITY.UserE.updateUser(user[0].id, userUpdate)
                    let sessionUpdate: ISessionRequest.ISession = {
                        otp: 0,
                        otpExpAt: 0,
                        otpVerified: 1,
                        isLogin: 1
                    }
                    await ENTITY.SessionE.buildSession(headers, sessionUpdate, user[0])
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
            }
            if (deleteUserId && deleteUserId != "") {
                await Aerospike.remove({ set: ENTITY.UserE.set, key: deleteUserId })
                await ENTITY.SessionE.removeAllSessionRelatedToUserId(deleteUserId)
            }

            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                user[0].id,
                0
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user[0], headers) }
        } catch (err) {
            consolelog(process.cwd(), "loginVerifyOtp", JSON.stringify(err), false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string} socialKey : social id
    * @param {string} medium : Social Platform type : FB, GOOGLE
    * */
    async socialAuthValidate(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthSocial) {
        try {
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.USER.check_social_key,
                    args: [payload.medium, payload.socialKey],
                    forEach: true
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let userObj: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            let user
            if (userObj && userObj.length > 0) {
                if (userObj[0].phnNo && userObj[0].phnNo != "" && userObj[0].phnVerified == 1) {
                    let userUpdate: IUserRequest.IUserUpdate = {
                        name: payload.name,
                    }
                    if (payload.email) {
                        userUpdate['email'] = payload.email
                    }
                    let session = {
                        isGuest: 0,
                        otp: 0,
                        otpExpAt: 0,
                        otpVerified: 1,
                        isLogin: 1,
                        updatedAt: new Date().getTime(),
                        // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                    }
                    user = await ENTITY.UserE.updateUser(userObj[0].id, userUpdate)
                    await ENTITY.SessionE.buildSession(headers, session, user)
                } else {
                    let userUpdate: IUserRequest.IUserUpdate = {
                        name: payload.name,
                    }
                    if (payload.email) {
                        userUpdate['email'] = payload.email
                    }
                    if (userObj[0].profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.INIT)
                        userUpdate['phnVerified'] = 0

                    let session = {
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isGuest: 0,
                        isLogin: 0,
                        // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                    }
                    await ENTITY.SessionE.buildSession(headers, session, userObj[0])
                    user = await ENTITY.UserE.updateUser(userObj[0].id, userUpdate)
                }
            } else {
                let userCreate: IUserRequest.IUserUpdate = {
                    socialKey: payload.socialKey,
                    medium: payload.medium,
                    email: payload.email ? payload.email : "",
                    name: payload.name,
                    createdAt: new Date().getTime(),
                    phnVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    isGuest: 0,
                }
                user = await ENTITY.UserE.createUser(headers, userCreate)
                let session = {
                    isGuest: 0,
                    otp: 0,
                    otpExpAt: 0,
                    otpVerified: 1,
                    isLogin: 1,
                    updatedAt: new Date().getTime(),
                    // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                }
                await ENTITY.SessionE.buildSession(headers, session, user)
            }
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                user.id,
                0
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers) }
        } catch (err) {
            consolelog(process.cwd(), "socialAuthValidate", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method PATCH
    * @param {string} cCode : country code with +, eg: +976
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} email : email
    * @param {string} name : name
    * @param {string=} socialKey : social id
    * @param {string=} medium : Social Platform type : FB, GOOGLE
    * */
    async createProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.ICreateProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            if (auth.userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PROFILE_SETUP_ALLREADY_COMPLETE)
            if (payload.socialKey && payload.medium) {
                let queryArg: IAerospike.Query = {
                    udf: {
                        module: 'user',
                        func: Constant.UDF.USER.check_phone_exist,
                        args: [payload.cCode],
                        forEach: true
                    },
                    equal: {
                        bin: "phnNo",
                        value: payload.phnNo
                    },
                    set: ENTITY.UserE.set,
                    background: false,
                }
                let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                if (checkUser && checkUser.length > 0) {
                    auth.userData = await ENTITY.UserE.getUser({ userId: auth.id })
                    let userchangePayload = {
                        name: payload.name,
                        email: payload.email,
                        cCode: payload.cCode,
                        phnNo: payload.phnNo,
                        medium: payload.medium,
                        socialKey: payload.socialKey,
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        deleteUserId: auth.userData.id
                    }
                    await ENTITY.UserchangeE.createUserchange(userchangePayload, checkUser[0])
                    let userUpdate = {
                        changePhnNo: 1
                    }
                    await ENTITY.UserE.updateUser(checkUser[0].id, userUpdate)
                    auth.userData['phnVerified'] = 0
                    return formatUserData(auth.userData, headers)
                } else {
                    let userUpdate = {
                        name: payload.name,
                        email: payload.email,
                        phnNo: payload.phnNo,
                        cCode: payload.cCode,
                        phnVerified: 0,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                    }
                    let user = await ENTITY.UserE.updateUser(checkUser[0].id, userUpdate)
                    let session = {
                        isGuest: 0,
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isLogin: 0,
                        // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                    }
                    await ENTITY.SessionE.buildSession(headers, session, user)
                    return formatUserData(user, headers)
                }
            } else {
                let userUpdate = {
                    name: payload.name,
                    email: payload.email,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                }
                let user = await ENTITY.UserE.updateUser(auth.userData.id, userUpdate)
                return formatUserData(user, headers)
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
            auth.userData = await ENTITY.UserE.getUser({ userId: auth.id })
            let dataToUpdate = {}
            if (payload.name)
                dataToUpdate['name'] = payload.name
            if (payload.email)
                dataToUpdate['email'] = payload.email
            if (payload.cCode && payload.phnNo) {
                let queryArg: IAerospike.Query = {
                    udf: {
                        module: 'user',
                        func: Constant.UDF.USER.check_phone_exist,
                        args: [payload.cCode],
                        forEach: true
                    },
                    equal: {
                        bin: "phnNo",
                        value: payload.phnNo
                    },
                    set: ENTITY.UserE.set,
                    background: false,
                }
                let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                if (checkUser && checkUser.length > 0) {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PHONE_NO_IN_USE)
                }
                let userchangePayload = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0
                }
                await ENTITY.UserchangeE.createUserchange(userchangePayload, auth.userData)
                dataToUpdate['changePhnNo'] = 1
            }
            let user = await ENTITY.UserE.updateUser(auth.id, dataToUpdate)
            user['phnVerified'] = 0;
            // ENTITY.UserE.syncUser(user)
            return formatUserData(user, headers)
        } catch (error) {
            consolelog(process.cwd(), "editProfile", error, false)
            return Promise.reject(error)
        }
    }
}

export const userController = new UserController();