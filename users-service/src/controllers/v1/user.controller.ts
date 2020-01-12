import * as Constant from '../../constant'
import { consolelog, formatUserData } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../databases/aerospike'

export class UserController {
    constructor() { }

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
                if (checkUser && checkUser[0].session && checkUser[0].session[headers.deviceid] && checkUser[0].session[headers.deviceid].otpExpAt <= new Date().getTime() && checkUser[0].session[headers.deviceid].otpExpAt != 0) {
                    otpExpAt = checkUser[0].session[headers.deviceid].otpExpAt
                }
                let sessionUpdate: IUserRequest.ISessionUpdate = {
                    otp: otp,
                    otpExpAt: otpExpAt,
                    otpVerified: 0,
                    isLogin: 0
                }
                await ENTITY.UserE.createSession(headers, checkUser[0], {}, sessionUpdate)
            } else {
                let userCreate: IUserRequest.IUserUpdate = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    phnVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT
                }
                let sessionCreate: IUserRequest.ISessionUpdate = {
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                }
                await ENTITY.UserE.createUser(headers, userCreate, sessionCreate)
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
    * */
    async loginVerifyOtp(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthVerifyOtp) {
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
            let userFromDb: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (userFromDb && userFromDb.length > 0) {
                if (userFromDb[0] && userFromDb[0].session && userFromDb[0].session[headers.deviceid] && userFromDb[0].session[headers.deviceid].otp == 0 && userFromDb[0].session[headers.deviceid].otpExpAt == 0)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)

                if (userFromDb[0] && userFromDb[0].session && userFromDb[0].session[headers.deviceid] && userFromDb[0].session[headers.deviceid].otp == payload.otp) {
                    if (userFromDb[0].session[headers.deviceid].otpExpAt > new Date().getTime()) {
                        let userUpdate: IUserRequest.IUserUpdate = {
                            phnVerified: 1,
                            removeUserId: "",
                        }
                        let sessionUpdate: IUserRequest.ISessionUpdate = {
                            otp: 0,
                            otpExpAt: 0,
                            otpVerified: 1,
                            isLogin: 1,
                            // createdAt: new Date().getTime()
                        }
                        let user: IUserRequest.IUserData = await ENTITY.UserE.createSession(headers, userFromDb[0], userUpdate, sessionUpdate)
                        if (userFromDb[0].removeUserId && userFromDb[0].removeUserId != "")
                            await Aerospike.remove({ set: "user", key: userFromDb[0].removeUserId })
                        let tokens = await ENTITY.UserE.getTokens(
                            headers.deviceid,
                            headers.devicetype,
                            [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                            user.id
                        )
                        return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers.deviceid) }
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_EXPIRED)
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
        } catch (err) {
            consolelog(process.cwd(), "authVerifyOtp", err, false)
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
                if (userObj.length == 2)
                    userObj = userObj.filter(obj => { return obj.removeUserId == "" })
                consolelog(process.cwd(), "checkpoint", JSON.stringify(userObj), false)
                let userUpdate: IUserRequest.IUserUpdate = {
                    socialKey: payload.socialKey,
                    medium: payload.medium,
                    name: payload.name,
                }
                if (payload.email) {
                    userUpdate['email'] = payload.email
                    userUpdate['emailVerified'] = 1
                }
                if (userObj[0].profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.INIT)
                    userUpdate['phnVerified'] = 0
                let sessionUpdate: IUserRequest.ISessionUpdate = {
                    otp: 0,
                    otpExpAt: 0,
                    otpVerified: 1,
                    isLogin: 1,
                    createdAt: new Date().getTime()
                }
                user = await ENTITY.UserE.createSession(headers, userObj[0], userUpdate, sessionUpdate)
            } else {
                let userCreate: IUserRequest.IUserUpdate = {
                    socialKey: payload.socialKey,
                    medium: payload.medium,
                    email: payload.email ? payload.email : "",
                    emailVerified: payload.email ? 1 : 0,
                    name: payload.name,
                    createdAt: new Date().getTime(),
                    phnVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT
                }
                let sessionUpdate: IUserRequest.ISessionUpdate = {
                    otp: 0,
                    otpExpAt: 0,
                    otpVerified: 1,
                    isLogin: 1,
                    createdAt: new Date().getTime()
                }
                user = await ENTITY.UserE.createUser(headers, userCreate, sessionUpdate)
            }

            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                user.id
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers.deviceid) }
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
                        removeUserId: auth.userData.id,
                        name: payload.name,
                        email: payload.email,
                        emailVerified: 1,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                        phnVerified: 0,
                        socialKey: payload.socialKey,
                        medium: payload.medium,
                    }
                    let sessionUpdate: IUserRequest.ISessionUpdate = {
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isLogin: 0,
                        createdAt: new Date().getTime(),
                    }
                    let user = await ENTITY.UserE.createSession(headers, checkPhoneExist[0], userUpdate, sessionUpdate)
                    let userChange = {
                        set: ENTITY.UserE.set,
                        cms: {
                            create: true,
                            argv: JSON.stringify(user)
                        },
                        sdm: {
                            create: true,
                            argv: JSON.stringify(user)
                        }
                    }
                    ENTITY.UserE.syncToKafka(userChange)
                    return formatUserData(user, headers.deviceid)
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
                    let sessionUpdate: IUserRequest.ISessionUpdate = {
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isLogin: 0,
                        createdAt: new Date().getTime(),
                    }
                    let user = await ENTITY.UserE.createSession(headers, auth.userData, userUpdate, sessionUpdate)
                    let userChange = {
                        set: ENTITY.UserE.set,
                        cms: {
                            create: true,
                            argv: JSON.stringify(user)
                        },
                        sdm: {
                            create: true,
                            argv: JSON.stringify(user)
                        }
                    }
                    ENTITY.UserE.syncToKafka(userChange)
                    return formatUserData(user, headers.deviceid)
                }
            } else {
                let userUpdate = {
                    name: payload.name,
                    email: payload.email,
                    phnNo: payload.phnNo,
                    cCode: payload.cCode,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                }
                let sessionUpdate: IUserRequest.ISessionUpdate = {
                    otp: auth.userData.phnVerified ? 0 : Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: auth.userData.phnVerified ? 0 : (new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME),
                }
                let user = await ENTITY.UserE.createSession(headers, auth.userData, userUpdate, sessionUpdate)
                let userChange = {
                    set: ENTITY.UserE.set,
                    cms: {
                        create: true,
                        argv: JSON.stringify(user)
                    },
                    sdm: {
                        create: true,
                        argv: JSON.stringify(user)
                    }
                }
                ENTITY.UserE.syncToKafka(userChange)
                return formatUserData(user, headers.deviceid)
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
    * */
    async editProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.IEditProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            let user = await ENTITY.UserE.updateUser(auth.userData, payload)
            // ENTITY.UserE.syncUser(user)
            return formatUserData(user, headers.deviceid)
        } catch (error) {
            consolelog(process.cwd(), "editProfile", error, false)
            return Promise.reject(error)
        }
    }
}

export const userController = new UserController();