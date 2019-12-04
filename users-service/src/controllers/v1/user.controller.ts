import * as Constant from '../../constant'
import { consolelog, cryptData, uuid } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../databases/aerospike'

export class UserController {

    constructor() { }

    /**
    * @method GRPC
    * @param {string} id : user id
    * */
    async getById(payload: IUserServiceRequest.IId) {
        try {
            consolelog("getById", payload.id, true)
            let getArg: IAerospike.Get = {
                set: 'user',
                key: payload.id
            }
            let user: IUserRequest.IUserData = await Aerospike.get(getArg)
            if (user && user.id) {
                return user
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E404.USER_NOT_FOUND)
        } catch (error) {
            consolelog("getById", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} cCode : country code with +, eg: +976
    * */
    async loginSendOtp(payload: IUserRequest.IAuthSendOtp) {
        try {
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.USER.check_user_exist,
                    args: [payload.phnNo, payload.cCode, payload.deviceid],
                },
                set: 'user',
                background: false,
            }
            let checkUserExist: IUserRequest.IUserData = await Aerospike.query(queryArg)
            if (checkUserExist && checkUserExist.id) {
                let otpExpiryTime = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                let dataToUpdate = {
                    isLogin: 0,
                    otpExpAt: otpExpiryTime,
                }
                if (checkUserExist.otpExpAt <= new Date().getTime()) {
                    dataToUpdate['otp'] = (checkUserExist.otp == Constant.SERVER.BY_PASS_OTP) ? Constant.SERVER.BY_PASS_OTP_2 : Constant.SERVER.BY_PASS_OTP
                }
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: 'user',
                    key: checkUserExist.id,
                    update: true,
                }
                let updateUser = await Aerospike.put(putArg)
            } else {
                let id = uuid;
                let otpExpiryTime = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                let dataToSave: IUserRequest.IUserData = {
                    id: id,
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    phnVerified: 0,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: otpExpiryTime,
                    language: payload.language,
                    country: payload.country,
                    appversion: payload.appversion,
                    devicemodel: payload.devicemodel,
                    devicetype: payload.devicetype,
                    osversion: payload.osversion,
                    deviceid: payload.deviceid,
                    isLogin: 0,
                    socialKey: "",
                    mdeium: "",
                    email: "",
                    createdAt: new Date().getTime()
                }
                let putArg: IAerospike.Put = {
                    bins: dataToSave,
                    set: 'user',
                    key: id,
                    ttl: Constant.SERVER.INITIAL_USER_TTL,
                    create: true,
                }
                await Aerospike.put(putArg)
            }
            return {}
        } catch (err) {
            consolelog("loginSendOtp", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} cCode : country code with +, eg: +976
    * @param {number} otp : 4 digit otp
    * */
    async loginVerifyOtp(payload: IUserRequest.IAuthVerifyOtp) {
        try {
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.USER.check_user_exist,
                    args: [payload.phnNo, payload.cCode, payload.deviceid],
                },
                set: 'user',
                background: false,
            }
            let checkUserExist: IUserRequest.IUserData = await Aerospike.query(queryArg)
            if (checkUserExist && checkUserExist.id) {
                if (checkUserExist.otp == 0 && checkUserExist.otpExpAt == 0)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E403.OTP_SESSION_EXPIRED)

                if (checkUserExist.otp == payload.otp) {
                    if (checkUserExist.otpExpAt > new Date().getTime()) {
                        let dataToUpdate = {
                            isLogin: 1,
                            phnVerified: 1,
                            otp: 0,
                            otpExpAt: 0,
                        }
                        let putArg: IAerospike.Put = {
                            bins: dataToUpdate,
                            set: 'user',
                            key: checkUserExist.id,
                            update: true,
                        }
                        let updateUser = await Aerospike.put(putArg)
                        let tokens = await ENTITY.UserE.getTokens(
                            payload.deviceid,
                            payload.devicetype,
                            [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                            checkUserExist.id
                        )
                        return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: {} }
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E403.OTP_EXPIRED)
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E403.INVALID_OTP)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E403.INVALID_OTP)
        } catch (err) {
            consolelog("authVerifyOtp", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string} socialKey : social id
    * @param {string} mdeium : Social Platform type : FB, GOOGLE
    * */
    async socialAuthValidate(payload: IUserRequest.IAuthSocial) {
        try {
            let isInsert = false
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.USER.check_device_id,
                    args: [payload.deviceid],
                },
                equal: {
                    bin: "socialKey",
                    value: payload.socialKey
                },
                set: 'user',
                background: false,
            }
            let userObj: IUserRequest.IUserData = await Aerospike.query(queryArg)
            if (!userObj) {
                console.log("1..............", 1)
                if ((payload.cCode && payload.phnNo) || payload.email) {
                    console.log("2..............", 2)
                    let queryArg: IAerospike.Query = {
                        udf: {
                            module: 'user',
                            func: Constant.UDF.USER.check_cCode_or_phnNo,
                            args: [payload.cCode, payload.email],
                        },
                        set: 'user',
                        background: false,
                    }
                    if (payload.cCode && payload.phnNo) {
                        queryArg['equal'] = {
                            bin: "phnNo",
                            value: payload.phnNo
                        }
                    }
                    let checkPhoneOrEmailExist: IUserRequest.IUserData = await Aerospike.query(queryArg)
                    if (checkPhoneOrEmailExist && checkPhoneOrEmailExist.id) {
                        console.log("1..............", 3)
                        userObj = checkPhoneOrEmailExist
                        let dataToUpdate = {
                            socialKey: payload.socialKey,
                            mdeium: payload.mdeium,
                            isLogin: 0
                        }
                        if (checkPhoneOrEmailExist.phnVerified == 0) {
                            console.log("1..............", 5)
                            let otpExpiryTime = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                            dataToUpdate['otpExpAt'] = otpExpiryTime
                            dataToUpdate['otp'] = (checkPhoneOrEmailExist.otp == Constant.SERVER.BY_PASS_OTP) ? Constant.SERVER.BY_PASS_OTP_2 : Constant.SERVER.BY_PASS_OTP
                        }
                        let putArg: IAerospike.Put = {
                            bins: dataToUpdate,
                            set: 'user',
                            key: checkPhoneOrEmailExist.id,
                            update: true,
                        }
                        await Aerospike.put(putArg)
                    } else {
                        console.log("6..............", 6)
                        isInsert = true
                    }
                } else {
                    console.log("7..............", 7)
                    isInsert = true
                }
            }
            if (isInsert) {
                console.log("8..............", 8)
                let id = uuid;
                let otpExpiryTime = 0
                userObj = {
                    id: id,
                    cCode: "",
                    phnNo: "",
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    phnVerified: 0,
                    otp: 0,
                    otpExpAt: otpExpiryTime,
                    language: payload.language,
                    country: payload.country,
                    appversion: payload.appversion,
                    devicemodel: payload.devicemodel,
                    devicetype: payload.devicetype,
                    osversion: payload.osversion,
                    deviceid: payload.deviceid,
                    isLogin: 0,
                    socialKey: payload.socialKey,
                    mdeium: payload.mdeium,
                    email: "",
                    createdAt: new Date().getTime()
                }
                let putArg: IAerospike.Put = {
                    bins: userObj,
                    set: 'user',
                    key: id,
                    ttl: Constant.SERVER.INITIAL_USER_TTL,
                    create: true,
                }
                await Aerospike.put(putArg)
            }
            if (userObj) {
                let tokens = await ENTITY.UserE.getTokens(
                    payload.deviceid,
                    payload.devicetype,
                    [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                    userObj.id
                )
                return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: userObj }
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
            }
        } catch (err) {
            consolelog("socialAuthValidate", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string=} socialKey : social id
    * @param {string=} mdeium : Social Platform type : FB, GOOGLE
    * @param {string=} cCode : country code with +, eg: +976
    * @param {string=} phnNo : phone number max length 9 digits
    * @param {string=} email : email
    * @param {string=} name : name
    * */
    async profileUpdate(payload: IUserRequest.IEditProf, auth: ICommonRequest.AuthorizationObj) {
        try {
            console.log("auth", auth)
            let dataToUpdate = {}
            if (auth && auth.userData && auth.userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.INIT) {
                if ((auth.userData.mdeium == Constant.DATABASE.TYPE.SOCIAL_PLATFORM.FB || auth.userData.mdeium == Constant.DATABASE.TYPE.SOCIAL_PLATFORM.GOOGLE) &&
                    auth.userData.socialKey != "") {
                    if (payload.socialKey && payload.mdeium) {
                        dataToUpdate['socialKey'] = payload.socialKey
                        dataToUpdate['mdeium'] = payload.mdeium
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.SOCIAL_KEY_REQ)
                }
                if (payload.cCode && payload.phnNo) {
                    dataToUpdate['cCode'] = payload.cCode
                    dataToUpdate['phnNo'] = payload.phnNo
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PHONE_NO_REQ)
                if (payload.email) {
                    dataToUpdate['email'] = payload.email
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.EMAIL_REQ)
                if (payload.name) {
                    dataToUpdate['name'] = payload.name
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.EMAIL_REQ)
                dataToUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
            } else {
                if (payload.socialKey && payload.mdeium) {
                    dataToUpdate['socialKey'] = payload.socialKey
                    dataToUpdate['mdeium'] = payload.mdeium
                }
                if (payload.cCode && payload.phnNo) {
                    dataToUpdate['cCode'] = payload.cCode
                    dataToUpdate['phnNo'] = payload.phnNo
                }
                if (payload.email) {
                    dataToUpdate['email'] = payload.email
                }
                if (payload.name) {
                    dataToUpdate['name'] = payload.name
                }
            }
            let putArg: IAerospike.Put = {
                bins: dataToUpdate,
                set: 'user',
                key: auth.userData.id,
                update: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog("profileUpdate", error, false)
            return Promise.reject(error)
        }
    }
}

export const userController = new UserController();