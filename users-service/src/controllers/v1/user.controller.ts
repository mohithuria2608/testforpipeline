import * as Constant from '../../constant'
import { consolelog, cryptData, uuid } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../databases/aerospike'

export class UserController {

    constructor() { }

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
                    isLogin: 0
                }
                let putArg: IAerospike.Put = {
                    bins: dataToSave,
                    set: 'user',
                    key: id,
                    ttl: Constant.SERVER.INITIAL_USER_TTL,
                    create: true,
                }
                let savedUser = await Aerospike.put(putArg)
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
}

export const userController = new UserController();