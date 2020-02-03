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
                if (payload.as.update)
                    ENTITY.UserE.updateUser(data.userId, data)
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
                    userId: checkUser[0].id
                    // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                }
                await ENTITY.SessionE.buildSession(headers, session)
                if (checkUser[0].changePhnNo == 1) {
                    let userUpdate = {
                        changePhnNo: 0
                    }
                    await ENTITY.UserE.updateUser(checkUser[0].id, userUpdate)
                    await Aerospike.remove({ set: ENTITY.UserchangeE.set, key: checkUser[0].id })
                }
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
                    let userData = await ENTITY.UserE.getUser({ userId: userchange[0].id })
                    let otp = Constant.SERVER.BY_PASS_OTP
                    let otpExpAt = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                    let update = {
                        otp: otp,
                        otpExpAt: otpExpAt,
                        otpVerified: 0,
                        isGuest: 0,
                        // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                    }
                    await ENTITY.UserchangeE.createUserchange(update, userData)
                } else {
                    let userCreate: IUserRequest.IUserUpdate = {
                        changePhnNo: 1,
                        phnVerified: 0,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    }
                    // let userInCms = await ENTITY.UserE.checkUserOnCms({})
                    // if (userInCms && userInCms.id) {
                    //     userCreate['cmsUserRef'] = userInCms.id
                    //     if (userInCms['sdmUserRef'])
                    //         userCreate['sdmUserRef'] = userInCms.id
                    //     userCreate['name'] = userInCms.name
                    //     userCreate['email'] = userInCms.email
                    //     userCreate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    // } else {
                    //     let userInSdm = await ENTITY.UserE.checkUserOnSdm({})
                    //     if (userInSdm && userInSdm.id) {
                    //         userCreate['sdmUserRef'] = userInSdm.id
                    //         userCreate['name'] = userInCms.name
                    //         userCreate['email'] = userInCms.email
                    //         userCreate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    //     }
                    // }
                    let user = await ENTITY.UserE.createUser(headers, userCreate)
                    let userchangePayload = {
                        cCode: payload.cCode,
                        phnNo: payload.phnNo,
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isGuest: 0,
                    }
                    await ENTITY.UserchangeE.createUserchange(userchangePayload, user)
                }
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
            let sessionTime = Math.ceil((new Date().getTime()) / 1000)
            let deleteUserId = ""
            let userUpdate: IUserRequest.IUserUpdate = {
                cCode: payload.cCode,
                phnNo: payload.phnNo,
                phnVerified: 1
            }
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
                if (user.length >= 2)
                    return Promise.reject("Same phone number used more than once")
                if (user[0] && user[0].id && user[0].changePhnNo == 1) {
                    userUpdate['changePhnNo'] = 0
                    let userchange = await ENTITY.UserchangeE.validateOtpOnPhnChange(payload, user[0])
                    if (userchange && userchange.isGuest != undefined)
                        payload.isGuest = userchange.isGuest
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
                }
                else {
                    if (user[0].email && user[0].name)
                        userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    await ENTITY.SessionE.validateOtp(headers, payload, user[0], sessionTime)
                }
                user[0] = await ENTITY.UserE.updateUser(user[0].id, userUpdate)
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
                    let isSync = false
                    if (userchange[0].deleteUserId) {
                        isSync = true
                        deleteUserId = userchange[0].deleteUserId
                    }
                    user[0] = await ENTITY.UserE.getUser({ userId: userchange[0].id })
                    userchange[0] = await ENTITY.UserchangeE.validateOtpOnPhnChange(payload, user[0])
                    if (userchange[0] && userchange[0].isGuest != undefined)
                        payload.isGuest = userchange[0].isGuest
                    let userUpdate: IUserRequest.IUserUpdate = {
                        cCode: payload.cCode,
                        phnNo: payload.phnNo,
                        phnVerified: 1,
                        changePhnNo: 0,
                    }
                    if (userchange && userchange[0].isGuest != undefined)
                        payload.isGuest = userchange[0].isGuest
                    if (userchange[0].cCode)
                        userUpdate['cCode'] = userchange[0].cCode
                    if (userchange[0].phnNo)
                        userUpdate['phnNo'] = userchange[0].phnNo
                    if (userchange[0].cartId)
                        userUpdate['cartId'] = userchange[0].cartId
                    if (userchange[0].name)
                        userUpdate['name'] = userchange[0].name
                    if (userchange[0].email)
                        userUpdate['email'] = userchange[0].email
                    if (userchange[0].socialKey)
                        userUpdate['socialKey'] = userchange[0].socialKey
                    if (userchange[0].medium)
                        userUpdate['medium'] = userchange[0].medium
                    user[0] = await ENTITY.UserE.updateUser(user[0].id, userUpdate)

                    if (isSync) {
                        let userSync: IKafkaGrpcRequest.IKafkaBody = {
                            set: ENTITY.UserE.set,
                            sdm: {
                                create: true,
                                argv: JSON.stringify(user[0])
                            },
                            cms: {
                                create: true,
                                argv: JSON.stringify(user[0])
                            },
                        }
                        kafkaService.kafkaSync(userSync)
                    }
                    if (user[0].email && user[0].name && user[0].cCode && user[0].phnNo) {
                        user[0] = await ENTITY.UserE.updateUser(user[0].id, { profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST })
                    }
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
            }
            if (deleteUserId && deleteUserId != "") {
                await Aerospike.remove({ set: ENTITY.UserE.set, key: deleteUserId })
                await ENTITY.SessionE.removeAllSessionRelatedToUserId(deleteUserId)
            }
            let sessionUpdate: ISessionRequest.ISession = {
                otp: 0,
                otpExpAt: 0,
                otpVerified: 1,
                isGuest: payload.isGuest,
                sessionTime: sessionTime,
                userId: user[0].id
            }
            await ENTITY.SessionE.buildSession(headers, sessionUpdate)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                user[0].id,
                payload.isGuest,
                sessionTime
            )
            user[0]['isGuest'] = payload.isGuest
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user[0], headers) }
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
            let sessionTime = Math.ceil((new Date().getTime()) / 1000)
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
            if (userObj && userObj.length > 0) {
                if (userObj[0].phnNo && userObj[0].phnNo != "" && userObj[0].phnVerified == 1) {
                    let userUpdate: IUserRequest.IUserUpdate = {
                        name: payload.name,
                    }
                    if (payload.email)
                        userUpdate['email'] = payload.email
                    let session = {
                        isGuest: 0,
                        otp: 0,
                        otpExpAt: 0,
                        otpVerified: 1,
                        sessionTime: sessionTime,
                        userId: userObj[0].id
                        // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                    }
                    userObj[0] = await ENTITY.UserE.updateUser(userObj[0].id, userUpdate)
                    await ENTITY.SessionE.buildSession(headers, session)
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
                        sessionTime: sessionTime,
                        userId: userObj[0].id,
                        // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                    }
                    await ENTITY.SessionE.buildSession(headers, session)
                    userObj[0] = await ENTITY.UserE.updateUser(userObj[0].id, userUpdate)
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
                }
                userObj[0] = await ENTITY.UserE.createUser(headers, userCreate)
                let session = {
                    isGuest: 0,
                    otp: 0,
                    otpExpAt: 0,
                    otpVerified: 1,
                    sessionTime: sessionTime,
                    userId: userObj[0].id
                    // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                }
                await ENTITY.SessionE.buildSession(headers, session)
            }
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                userObj[0].id,
                0,
                sessionTime
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(userObj[0], headers) }
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
    * @param {string=} socialKey : social id
    * @param {string=} medium : Social Platform type : FB, GOOGLE
    * */
    async createProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.ICreateProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            if (userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PROFILE_SETUP_ALLREADY_COMPLETE)
            let userUpdate = {
                name: payload.name,
                email: payload.email,
            }
            if ((payload.socialKey && payload.medium) || (userData.socialKey && userData.socialKey != "" && userData.medium && userData.medium != "")) {
                userUpdate['changePhnNo'] = 1
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
                let userchangePayload = {
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
                }
                if (checkUser && checkUser.length > 0) {
                    userchangePayload['deleteUserId'] = userData.id
                    userData = checkUser[0]
                } else {
                    userchangePayload['deleteUserId'] = ""
                }
                userData = await ENTITY.UserE.updateUser(userData.id, userUpdate)
                await ENTITY.UserchangeE.createUserchange(userchangePayload, userData)
                userData['phnVerified'] = 0
                userData['name'] = payload.name
                userData['email'] = payload.email
                userData['cCode'] = payload.cCode
                userData['phnNo'] = payload.phnNo
                userData['medium'] = userData.medium
                userData['socialKey'] = userData.socialKey
                userData['isGuest'] = 0
                return formatUserData(userData, headers)
            } else {
                userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                let user = await ENTITY.UserE.updateUser(userData.id, userUpdate)
                let userSync: IKafkaGrpcRequest.IKafkaBody = {
                    set: ENTITY.UserE.set,
                    sdm: {
                        create: true,
                        argv: JSON.stringify(user)
                    },
                    cms: {
                        create: true,
                        argv: JSON.stringify(user)
                    },
                }
                kafkaService.kafkaSync(userSync)
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
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            let dataToUpdate = {}
            if (payload.name)
                dataToUpdate['name'] = payload.name
            if (payload.email)
                dataToUpdate['email'] = payload.email
            if (payload.cCode && payload.phnNo) {
                let userchangePayload = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0
                }
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
                    userchangePayload['cartId'] = userData.cartId
                    userchangePayload['deleteUserId'] = checkUser[0].id
                    userData = checkUser[0]
                }
                dataToUpdate['changePhnNo'] = 1
                await ENTITY.UserchangeE.createUserchange(userchangePayload, userData)
            }
            let user = await ENTITY.UserE.updateUser(auth.id, dataToUpdate)
            if (payload.cCode && payload.phnNo) {
                user['phnVerified'] = 0;
                user['cCode'] = payload.cCode
                user['phnNo'] = payload.phnNo
            }
            return formatUserData(user, headers)
        } catch (error) {
            consolelog(process.cwd(), "editProfile", error, false)
            return Promise.reject(error)
        }
    }
}

export const userController = new UserController();