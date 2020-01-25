import * as Constant from '../../constant'
import { formatUserData, consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class GuestController {

    constructor() { }

    // /**
    //  * @method POST
    //  * */
    // async guestLogin(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestLogin) {
    //     try {
    //         let sessionTime = Math.ceil((new Date().getTime()) / 1000)
    //         let userCreate: IUserRequest.IUserUpdate = {
    //             profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
    //         }
    //         let user = await ENTITY.UserE.createUser(headers, userCreate)
    //         let session = {
    //             otp: 0,
    //             otpExpAt: 0,
    //             otpVerified: 1,
    //             isGuest: 1,
    //             sessionTime: sessionTime,
    //             userId: user.id,
    //             // ttl: Constant.SERVER.OTP_EXPIRE_TIME
    //         }
    //         await ENTITY.SessionE.buildSession(headers, session)
    //         let tokens = await ENTITY.UserE.getTokens(
    //             headers.deviceid,
    //             headers.devicetype,
    //             [Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
    //             user.id,
    //             1,
    //             sessionTime
    //         )
    //         return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers) }
    //     } catch (error) {
    //         consolelog(process.cwd(), "guestLogin", error, false)
    //         return Promise.reject(error)
    //     }
    // }

    // /**
    // * @method POST
    // * @param {string} cCode : country code with +, eg: +976
    // * @param {string} phnNo : phone number max length 9 digits
    // * @param {string} email : email
    // * @param {string} name : name
    // * @param {string} isGuest : number
    // * */
    // async guestCheckout(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestCheckout, auth: ICommonRequest.AuthorizationObj) {
    //     try {
    //         let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
    //         let queryArg: IAerospike.Query = {
    //             udf: {
    //                 module: 'user',
    //                 func: Constant.UDF.USER.check_phone_exist,
    //                 args: [payload.cCode],
    //                 forEach: true
    //             },
    //             equal: {
    //                 bin: "phnNo",
    //                 value: payload.phnNo
    //             },
    //             set: ENTITY.UserE.set,
    //             background: false,
    //         }
    //         let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
    //         let userchangePayload = {
    //             name: payload.name,
    //             email: payload.email,
    //             cartId: userData.cartId,
    //             cCode: payload.cCode,
    //             phnNo: payload.phnNo,
    //             otp: Constant.SERVER.BY_PASS_OTP,
    //             otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
    //             otpVerified: 0,
    //             deleteUserId: userData.id,
    //             isGuest: payload.isGuest
    //         }
    //         let userUpdate = {
    //             changePhnNo: 1,
    //         }
    //         if (checkUser && checkUser.length > 0) {
    //             userchangePayload['cartId'] = userData.cartId
    //             userchangePayload['deleteUserId'] = userData.id
    //             userData = checkUser[0]
    //         } else {
    //             userchangePayload['deleteUserId'] = ""
    //         }
    //         await ENTITY.UserE.updateUser(userData.id, userUpdate)
    //         await ENTITY.UserchangeE.createUserchange(userchangePayload, userData)
    //         userData['name'] = payload.name
    //         userData['email'] = payload.email
    //         userData['cCode'] = payload.cCode
    //         userData['phnNo'] = payload.phnNo
    //         userData['isGuest'] = payload.isGuest
    //         userData['phnVerified'] = 0
    //         return formatUserData(userData, headers)
    //     } catch (error) {
    //         consolelog(process.cwd(), "guestCheckout", error, false)
    //         return Promise.reject(error)
    //     }
    // }
}

export const guestController = new GuestController();