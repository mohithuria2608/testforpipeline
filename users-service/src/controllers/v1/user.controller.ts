import * as Constant from '../../constant'
import { consolelog, cryptData, formatUserData } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../databases/aerospike'

export class UserController {
    private uuidv1 = require('uuid/v1');
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
                    func: Constant.UDF.USER.check_phone_exist,
                    args: [payload.cCode],
                },
                equal: {
                    bin: "phnNo",
                    value: payload.phnNo
                },
                set: 'user',
                background: false,
            }
            let checkPhoneExist: IUserRequest.IUserData = await Aerospike.query(queryArg)
            if (checkPhoneExist && checkPhoneExist.id) {
                let otp = Constant.SERVER.BY_PASS_OTP
                if (checkPhoneExist.session[payload.deviceid].otpExpAt <= new Date().getTime())
                    otp = (checkPhoneExist.session[payload.deviceid].otp == Constant.SERVER.BY_PASS_OTP) ? Constant.SERVER.BY_PASS_OTP_2 : Constant.SERVER.BY_PASS_OTP

                let otpExpiryTime = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                let session: IUserRequest.ISession = {
                    deviceid: payload.deviceid,
                    otp: otp,
                    otpExpAt: otpExpiryTime,
                    otpVerified: 0,
                    language: payload.language,
                    country: payload.country,
                    appversion: payload.appversion,
                    devicemodel: payload.devicemodel,
                    devicetype: payload.devicetype,
                    osversion: payload.osversion,
                    isLogin: 0,
                    createdAt: new Date().getTime(),
                    cartId: ""
                }

                let dataToUpdate = {
                    session: {}
                }
                dataToUpdate['session'][payload.deviceid] = session
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: 'user',
                    key: checkPhoneExist.id,
                    update: true,
                }
                let updateUser = await Aerospike.put(putArg)
            } else {
                let id = this.uuidv1();
                let otpExpiryTime = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                let session: IUserRequest.ISession = {
                    deviceid: payload.deviceid,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: otpExpiryTime,
                    otpVerified: 0,
                    language: payload.language,
                    country: payload.country,
                    appversion: payload.appversion,
                    devicemodel: payload.devicemodel,
                    devicetype: payload.devicetype,
                    osversion: payload.osversion,
                    isLogin: 0,
                    createdAt: new Date().getTime(),
                    cartId: ""
                }
                let dataToSave: IUserRequest.IUserData = {
                    id: id,
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    phnVerified: 0,
                    socialKey: "",
                    medium: "",
                    email: "",
                    emailVerified: 0,
                    name: "",
                    address: [],
                    createdAt: new Date().getTime(),
                    session: {}
                }
                dataToSave['session'][payload.deviceid] = session
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
                    func: Constant.UDF.USER.check_phone_exist,
                    args: [payload.cCode],
                },
                equal: {
                    bin: "phnNo",
                    value: payload.phnNo
                },
                set: 'user',
                background: false,
            }
            let checkUserExist: IUserRequest.IUserData = await Aerospike.query(queryArg)
            if (checkUserExist && checkUserExist.id) {
                if (checkUserExist.session[payload.deviceid].otp == 0 && checkUserExist.session[payload.deviceid].otpExpAt == 0)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)

                if (checkUserExist.session[payload.deviceid].otp == payload.otp) {
                    if (checkUserExist.session[payload.deviceid].otpExpAt > new Date().getTime()) {
                        let session: IUserRequest.ISession = {
                            deviceid: payload.deviceid,
                            otp: 0,
                            otpExpAt: 0,
                            otpVerified: 1,
                            language: payload.language,
                            country: payload.country,
                            appversion: payload.appversion,
                            devicemodel: payload.devicemodel,
                            devicetype: payload.devicetype,
                            osversion: payload.osversion,
                            isLogin: 1,
                            createdAt: new Date().getTime(),
                            cartId: ""
                        }

                        let dataToUpdate = {
                            phnVerified: 1,
                            removeUserId: "",
                            session: {}
                        }
                        dataToUpdate['session'][payload.deviceid] = session
                        let putArg: IAerospike.Put = {
                            bins: dataToUpdate,
                            set: 'user',
                            key: checkUserExist.id,
                            update: true,
                        }
                        let updateUser = await Aerospike.put(putArg)
                        if (checkUserExist.removeUserId && checkUserExist.removeUserId != "")
                            await Aerospike.remove({ set: "user", key: checkUserExist.removeUserId })
                        let user = await this.getById({ id: checkUserExist.id })
                        let tokens = await ENTITY.UserE.getTokens(
                            payload.deviceid,
                            payload.devicetype,
                            [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                            user.id
                        )
                        return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, payload.deviceid) }
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_EXPIRED)
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
        } catch (err) {
            consolelog("authVerifyOtp", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string} socialKey : social id
    * @param {string} medium : Social Platform type : FB, GOOGLE
    * */
    async socialAuthValidate(payload: IUserRequest.IAuthSocial) {
        try {
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "socialKey",
                    value: payload.socialKey
                },
                set: 'user',
                background: false,
            }
            let userObj: IUserRequest.IUserData = await Aerospike.query(queryArg)
            if (userObj && userObj.id) {
                let dataToUpdate = {
                    socialKey: payload.socialKey,
                    medium: payload.medium,
                    name: payload.name,
                    session: {}
                }
                if (payload.email) {
                    dataToUpdate['email'] = payload.email
                    dataToUpdate['emailVerified'] = 1
                }
                if (userObj.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.INIT)
                    dataToUpdate['phnVerified'] = 0

                let session: IUserRequest.ISession = {
                    deviceid: payload.deviceid,
                    otp: 0,
                    otpExpAt: 0,
                    otpVerified: 1,
                    language: payload.language,
                    country: payload.country,
                    appversion: payload.appversion,
                    devicemodel: payload.devicemodel,
                    devicetype: payload.devicetype,
                    osversion: payload.osversion,
                    isLogin: 1,
                    createdAt: new Date().getTime(),
                    cartId: ""
                }
                dataToUpdate['session'][payload.deviceid] = session
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: 'user',
                    key: userObj.id,
                    update: true,
                }
                await Aerospike.put(putArg)
            } else {
                let id = this.uuidv1();
                userObj = {
                    id: id,
                    cCode: "",
                    phnNo: "",
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    phnVerified: 0,
                    socialKey: payload.socialKey,
                    medium: payload.medium,
                    email: payload.email ? payload.email : "",
                    emailVerified: payload.email ? 1 : 0,
                    name: payload.name,
                    createdAt: new Date().getTime(),
                    session: {}
                }
                let session: IUserRequest.ISession = {
                    deviceid: payload.deviceid,
                    otp: 0,
                    otpExpAt: 0,
                    otpVerified: 1,
                    language: payload.language,
                    country: payload.country,
                    appversion: payload.appversion,
                    devicemodel: payload.devicemodel,
                    devicetype: payload.devicetype,
                    osversion: payload.osversion,
                    isLogin: 1,
                    createdAt: new Date().getTime(),
                    cartId: ""
                }
                userObj['session'][payload.deviceid] = session
                let putArg: IAerospike.Put = {
                    bins: userObj,
                    set: 'user',
                    key: id,
                    ttl: Constant.SERVER.INITIAL_USER_TTL,
                    create: true,
                }
                await Aerospike.put(putArg)
            }

            userObj = await this.getById({ id: userObj.id })
            let tokens = await ENTITY.UserE.getTokens(
                payload.deviceid,
                payload.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                userObj.id
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(userObj, payload.deviceid) }
        } catch (err) {
            consolelog("socialAuthValidate", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string} cCode : country code with +, eg: +976
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} email : email
    * @param {string} name : name
    * @param {string=} socialKey : social id
    * @param {string=} medium : Social Platform type : FB, GOOGLE
    * */
    async createProfile(payload: IUserRequest.ICreateProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            if (auth.userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PROFILE_SETUP_ALLREADY_COMPLETE)
            if (payload.socialKey && payload.medium) {
                let queryArg: IAerospike.Query = {
                    udf: {
                        module: 'user',
                        func: Constant.UDF.USER.check_phone_exist,
                        args: [payload.cCode],
                    },
                    equal: {
                        bin: "phnNo",
                        value: payload.phnNo
                    },
                    set: 'user',
                    background: false,
                }
                let checkPhoneExist: IUserRequest.IUserData = await Aerospike.query(queryArg)
                if (checkPhoneExist && checkPhoneExist.id) {
                    if (checkPhoneExist.id == auth.userData.id) {
                        let otp = Constant.SERVER.BY_PASS_OTP
                        let otpExpiryTime = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                        let session: IUserRequest.ISession = {
                            deviceid: payload.deviceid,
                            otp: otp,
                            otpExpAt: otpExpiryTime,
                            otpVerified: 0,
                            language: payload.language,
                            country: payload.country,
                            appversion: payload.appversion,
                            devicemodel: payload.devicemodel,
                            devicetype: payload.devicetype,
                            osversion: payload.osversion,
                            isLogin: 0,
                            createdAt: new Date().getTime(),
                            cartId: ""
                        }
                        let dataToUpdate = {
                            name: payload.name,
                            email: payload.email,
                            phnNo: payload.phnNo,
                            cCode: payload.cCode,
                            phnVerified: 0,
                            profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                            session: {}
                        }
                        dataToUpdate['session'][payload.deviceid] = session
                        let putArg: IAerospike.Put = {
                            bins: dataToUpdate,
                            set: 'user',
                            key: auth.userData.id,
                            update: true,
                        }
                        await Aerospike.put(putArg)
                        let user = await this.getById({ id: auth.userData.id })
                        return formatUserData(user, payload.deviceid)
                    } else {
                        let dataToUpdate = {
                            removeUserId: auth.userData.id,
                            name: payload.name,
                            email: payload.email,
                            emailVerified: 1,
                            profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                            phnVerified: 0,
                            socialKey: payload.socialKey,
                            medium: payload.medium,
                            session: {}
                        }
                        let otp = Constant.SERVER.BY_PASS_OTP
                        let otpExpiryTime = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                        let session: IUserRequest.ISession = {
                            deviceid: payload.deviceid,
                            otp: otp,
                            otpExpAt: otpExpiryTime,
                            otpVerified: 0,
                            language: payload.language,
                            country: payload.country,
                            appversion: payload.appversion,
                            devicemodel: payload.devicemodel,
                            devicetype: payload.devicetype,
                            osversion: payload.osversion,
                            isLogin: 0,
                            createdAt: new Date().getTime(),
                            cartId: ""
                        }
                        dataToUpdate['session'][payload.deviceid] = session
                        let putArg: IAerospike.Put = {
                            bins: dataToUpdate,
                            set: 'user',
                            key: checkPhoneExist.id,
                            update: true,
                        }
                        await Aerospike.put(putArg)
                        let user = await this.getById({ id: checkPhoneExist.id })
                        return formatUserData(user, payload.deviceid)
                    }
                } else {
                    let otp = Constant.SERVER.BY_PASS_OTP
                    let otpExpiryTime = new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME
                    let session: IUserRequest.ISession = {
                        deviceid: payload.deviceid,
                        otp: otp,
                        otpExpAt: otpExpiryTime,
                        otpVerified: 0,
                        language: payload.language,
                        country: payload.country,
                        appversion: payload.appversion,
                        devicemodel: payload.devicemodel,
                        devicetype: payload.devicetype,
                        osversion: payload.osversion,
                        isLogin: 0,
                        createdAt: new Date().getTime(),
                        cartId: ""
                    }
                    let dataToUpdate = {
                        name: payload.name,
                        email: payload.email,
                        emailVerified: 1,
                        phnNo: payload.phnNo,
                        cCode: payload.cCode,
                        phnVerified: 0,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                        session: {}
                    }
                    dataToUpdate['session'][payload.deviceid] = session
                    let putArg: IAerospike.Put = {
                        bins: dataToUpdate,
                        set: 'user',
                        key: auth.userData.id,
                        update: true,
                    }
                    await Aerospike.put(putArg)
                    let user = await this.getById({ id: auth.userData.id })
                    return formatUserData(user, payload.deviceid)
                }
            } else {
                let otp = auth.userData.phnVerified ? 0 : Constant.SERVER.BY_PASS_OTP
                let otpExpiryTime = auth.userData.phnVerified ? 0 : (new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME)
                let session: IUserRequest.ISession = {
                    deviceid: payload.deviceid,
                    otp: otp,
                    otpExpAt: otpExpiryTime,
                    otpVerified: auth.userData.phnVerified ? 1 : 0,
                    language: payload.language,
                    country: payload.country,
                    appversion: payload.appversion,
                    devicemodel: payload.devicemodel,
                    devicetype: payload.devicetype,
                    osversion: payload.osversion,
                    isLogin: 0,
                    createdAt: new Date().getTime(),
                    cartId: ""
                }
                let dataToUpdate = {
                    name: payload.name,
                    email: payload.email,
                    phnNo: payload.phnNo,
                    cCode: payload.cCode,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                    session: {}
                }
                dataToUpdate['session'][payload.deviceid] = session
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: 'user',
                    key: auth.userData.id,
                    update: true,
                }
                await Aerospike.put(putArg)
                let user = await this.getById({ id: auth.userData.id })
                return formatUserData(user, payload.deviceid)
            }
        } catch (error) {
            consolelog("profileUpdate", error, false)
            return Promise.reject(error)
        }
    }
}

export const userController = new UserController();