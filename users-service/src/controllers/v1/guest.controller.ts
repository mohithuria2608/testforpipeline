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
            let sessionTime = Math.ceil((new Date().getTime())/1000)
            let userCreate: IUserRequest.IUserUpdate = {
                profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
            }
            let user = await ENTITY.UserE.createUser(headers, userCreate)
            let session = {
                otp: 0,
                otpExpAt: 0,
                otpVerified: 1,
                isLogin: 1,
                isGuest: 1,
                sessionTime: sessionTime,
                userId: user.id,
                // ttl: Constant.SERVER.OTP_EXPIRE_TIME
            }
            await ENTITY.SessionE.buildSession(headers, session)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                user.id,
                1,
                sessionTime
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers) }
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
    * @param {string} isGuest : number
    * */
    async guestCheckout(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestCheckout, auth: ICommonRequest.AuthorizationObj) {
        try {
            auth.userData = await ENTITY.UserE.getUser({ userId: auth.id })
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
                let userchangePayload = {
                    name: payload.name,
                    email: payload.email,
                    cartId: auth.userData.cartId,
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    deleteUserId: auth.userData.id,
                    isGuest: payload.isGuest
                }
                await ENTITY.UserchangeE.createUserchange(userchangePayload, checkUser[0])
                let userUpdate = {
                    changePhnNo: 1
                }
                await ENTITY.UserE.updateUser(checkUser[0].id, userUpdate)
            } else {
                let userUpdate: IUserRequest.IUserUpdate = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    name: payload.name,
                    email: payload.email,
                    phnVerified: 0,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
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
                auth.userData = await ENTITY.UserE.updateUser(auth.userData.id, userUpdate)
                let session = {
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 1,
                    isGuest: 1,
                    createdAt: new Date().getTime(),
                    userId: auth.userData.id,
                    // ttl: Constant.SERVER.OTP_EXPIRE_TIME
                }
                await ENTITY.SessionE.buildSession(headers, session)
            }
            auth.userData['isGuest'] = payload.isGuest
            auth.userData['cCode'] = payload.cCode
            auth.userData['phnNo'] = payload.phnNo
            auth.userData['name'] = payload.name
            auth.userData['email'] = payload.email
            auth.userData['phnVerified'] = 0
            return formatUserData(auth.userData, headers)
        } catch (error) {
            consolelog(process.cwd(), "isGuest", error, false)
            return Promise.reject(error)
        }
    }
}

export const guestController = new GuestController();