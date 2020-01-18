import * as Constant from '../../constant'
import { formatUserData, consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class GuestController {

    constructor() { }

    /**
     * @method POST
     * */
    async guestLogin(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestLogin) {
        try {
            let userCreate: IUserRequest.IUserUpdate = {
                profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                isGuest: 1,
            }
            let user = await ENTITY.UserE.createUser(headers, userCreate)
            let session = {
                otp: 0,
                otpExpAt: 0,
                otpVerified: 1,
                isLogin: 1,
                isGuest: 1,
                // ttl: Constant.SERVER.OTP_EXPIRE_TIME
            }
            await ENTITY.SessionE.buildSession(headers, session, user)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                user.id,
                1
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers.deviceid, headers.country, headers.language) }
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
            let user
            if (checkUser && checkUser.length > 0) {
                let userUpdate = {
                    keepUserId: checkUser[0].id,
                    name: payload.name,
                    email: payload.email,
                    emailVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                    phnVerified: 0,
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                }
                user = await ENTITY.UserE.updateUser(auth.userData.id, userUpdate)
                let sessionUpdate: ISessionRequest.ISession = {
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isLogin: 0,
                }
                await ENTITY.SessionE.buildSession(headers, sessionUpdate, auth.userData)
            } else {
                let userUpdate: IUserRequest.IUserUpdate = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    name: payload.name,
                    email: payload.email,
                    phnVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                    isGuest: 1,
                }
                let userInCms = await ENTITY.UserE.checkUserOnCms({})
                if (userInCms && userInCms.id) {
                    userUpdate['cmsUserRef'] = userInCms.id
                    if (userInCms['sdmUserRef'])
                        userUpdate['sdmUserRef'] = userInCms.id
                    userUpdate['name'] = userInCms.name
                    userUpdate['email'] = userInCms.email
                    userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                } else {
                    let userInSdm = await ENTITY.UserE.checkUserOnSdm({})
                    if (userInSdm && userInSdm.id) {
                        userUpdate['sdmUserRef'] = userInSdm.id
                        userUpdate['name'] = userInCms.name
                        userUpdate['email'] = userInCms.email
                        userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    }
                }
                user = await ENTITY.UserE.updateUser(auth.userData.id, userUpdate)
                let session = {
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    isGuest: 1,
                    createdAt: new Date().getTime(),
                    updatedAt: new Date().getTime(),
                    // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                }
                await ENTITY.SessionE.buildSession(headers, session, user)
            }
            return formatUserData(user, headers.deviceid, headers.country, headers.language)
        } catch (error) {
            consolelog(process.cwd(), "isGuest", error, false)
            return Promise.reject(error)
        }
    }
}

export const guestController = new GuestController();