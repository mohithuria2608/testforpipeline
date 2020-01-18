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
            let userToCheckOtp: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (userToCheckOtp && userToCheckOtp.length > 0) {
                // let userToKeep = [{ ...userToCheckOtp[0] }]
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "keepUserId",
                        value: userToCheckOtp[0].id
                    },
                    set: ENTITY.UserE.set,
                    background: false,
                }
                let tempUser = await Aerospike.query(queryArg)
                if (tempUser && tempUser.length > 0) {
                    if (payload.isGuest == 1) {
                        await ENTITY.SessionE.validateOtp(headers, payload, tempUser[0])
                    } else {
                        await ENTITY.SessionE.validateOtp(headers, payload, userToCheckOtp[0])
                    }
                } else {
                    await ENTITY.SessionE.validateOtp(headers, payload, userToCheckOtp[0])
                }
                let userUpdate: IUserRequest.IUserUpdate = {
                    phnVerified: 1,
                    keepUserId: "",
                }
                if (tempUser && tempUser.length > 0) {
                    if (tempUser[0].cartId && tempUser[0].cartId != "")
                        userUpdate['cartId'] = tempUser[0].cartId
                    if (tempUser[0].socialKey && tempUser[0].socialKey != "")
                        userUpdate['socialKey'] = tempUser[0].socialKey
                    if (tempUser[0].medium && tempUser[0].medium != "")
                        userUpdate['medium'] = tempUser[0].medium
                    if (tempUser[0].name && tempUser[0].name != "")
                        userUpdate['name'] = tempUser[0].name
                    if (tempUser[0].email && tempUser[0].email != "")
                        userUpdate['email'] = tempUser[0].email
                    if (tempUser[0].emailVerified)
                        userUpdate['emailVerified'] = tempUser[0].emailVerified
                }
                let user: IUserRequest.IUserData = await ENTITY.UserE.updateUser(userToCheckOtp[0].id, userUpdate)
                if (tempUser && tempUser.length > 0) {
                    await Aerospike.remove({ set: ENTITY.UserE.set, key: tempUser[0].id })
                    await ENTITY.SessionE.removeAllSessionRelatedToUserId(tempUser[0].id)
                }
                let tokens = await ENTITY.UserE.getTokens(
                    headers.deviceid,
                    headers.devicetype,
                    [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                    user.id,
                    0
                )
                return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers.deviceid, headers.country, headers.language) }
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
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
                        userUpdate['emailVerified'] = 1
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
                        userUpdate['emailVerified'] = 1
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
                    emailVerified: payload.email ? 1 : 0,
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
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers.deviceid, headers.country, headers.language) }
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
                let checkPhoneExist: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                if (checkPhoneExist && checkPhoneExist.length > 0) {
                    let userUpdate = {
                        keepUserId: checkPhoneExist[0].id,
                        name: payload.name,
                        email: payload.email,
                        emailVerified: 1,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                        phnVerified: 0,
                        socialKey: payload.socialKey,
                        medium: payload.medium
                    }
                    let user = await ENTITY.UserE.updateUser(auth.userData.id, userUpdate)
                    let sessionUpdate: ISessionRequest.ISession = {
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isLogin: 0,
                    }
                    await ENTITY.SessionE.buildSession(headers, sessionUpdate, checkPhoneExist[0])
                    return formatUserData(user, headers.deviceid, headers.country, headers.language)
                } else {
                    let userUpdate = {
                        name: payload.name,
                        email: payload.email,
                        emailVerified: 1,
                        phnNo: payload.phnNo,
                        cCode: payload.cCode,
                        phnVerified: 0,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                    }
                    let user = await ENTITY.UserE.updateUser(checkPhoneExist[0].id, userUpdate)
                    let session = {
                        isGuest: 0,
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isLogin: 0,
                        // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                    }
                    await ENTITY.SessionE.buildSession(headers, session, user)
                    return formatUserData(user, headers.deviceid, headers.country, headers.language)
                }
            } else {
                let userUpdate = {
                    name: payload.name,
                    email: payload.email,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                }
                let user = await ENTITY.UserE.updateUser(auth.userData.id, userUpdate)
                return formatUserData(user, headers.deviceid, headers.country, headers.language)
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
            }
            let user = await ENTITY.UserE.updateUser(auth.id, payload)
            // ENTITY.UserE.syncUser(user)
            return formatUserData(user, headers.deviceid, headers.country, headers.language)
        } catch (error) {
            consolelog(process.cwd(), "editProfile", error, false)
            return Promise.reject(error)
        }
    }
}

export const userController = new UserController();