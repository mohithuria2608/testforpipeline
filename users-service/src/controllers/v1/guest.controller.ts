import * as Constant from '../../constant'
import { formatUserData, consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../databases/aerospike'

export class GuestController {

    constructor() { }

    /**
     * @method POST
     * */
    async guestLogin(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestLogin) {
        try {
            let userCreate = {
                profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                isGuest: 1,
            }
            let sessionCreate: IUserRequest.ISessionUpdate = {
                otp: 0,
                otpExpAt: 0,
                otpVerified: 1,
                isLogin: 1,
                isGuest: 1,
            }
            let user: IUserRequest.IUserData = await ENTITY.UserE.createUser(headers, userCreate, sessionCreate)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                user.id,
                1
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers.deviceid) }
        } catch (err) {
            consolelog(process.cwd(), "guestLogin", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string} cCode : country code with +, eg: +976
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} email : email
    * @param {string} name : name
    * */
    async guestCheckout(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IisGuest, auth: ICommonRequest.AuthorizationObj) {
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
                let userUpdate = {
                    mergeUserId: checkUser[0].id,
                    name: payload.name,
                    email: payload.email,
                    emailVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                    phnVerified: 0,
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                }
                let sessionUpdate: IUserRequest.ISessionUpdate = {
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isLogin: 0,
                    createdAt: new Date().getTime(),
                }
                let user = await ENTITY.UserE.createSession(headers, auth.userData, userUpdate, sessionUpdate)
            } else {
                let userCreate: IUserRequest.IUserUpdate = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    name: payload.name,
                    email: payload.email,
                    phnVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                    isGuest: 1,
                }
                let sessionCreate: IUserRequest.ISessionUpdate = {
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    isGuest: 1,
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
                await ENTITY.UserE.createUser(headers, userCreate, sessionCreate)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "isGuest", error, false)
            return Promise.reject(error)
        }
    }
}

export const guestController = new GuestController();