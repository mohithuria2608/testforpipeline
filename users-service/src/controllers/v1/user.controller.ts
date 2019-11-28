import * as Constant from '../../constant'
import { consolelog, cryptData } from '../../utils'
import * as ENTITY from '../../entity'

export class UserController {

    constructor() { }

    /**
    * @method POST
    * @param {string} phoneNo : phone number max length 9 digits
    * @param {string} countryCode : country code with +, eg: +976
    * */
    async loginSendOtp(payload: IUserRequest.IRefreshToken) {
        try {
            

            // ENTITY.UserE.DAO.read()
            //step1 : check user exists
            const userExists = true
            if (userExists) {
                //step2 : send otp
                return {}
            } else {
                //step4 : create user
                //step5 : send otp
                return {}
            }
        } catch (err) {
            consolelog("loginSendOtp", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @param {string} phoneNo : phone number max length 9 digits
    * @param {string} countryCode : country code with +, eg: +976
    * @param {number} otp : 4 digit otp
    * */
    async loginVerifyOtp(payload: IUserRequest.IAuthVerifyOtp) {
        try {
            if (payload.otp == Constant.SERVER.BY_PASS_OTP) {
                const profileComplete = true
                let tokens = await ENTITY.UserE.getTokens(
                    payload.deviceid,
                    payload.devicetype,
                    [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH]
                )
                if (profileComplete) {
                    const cartId = await cryptData(payload.deviceid)
                    return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: { cartId } }
                } else {
                    return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: { profileComplete: false } }
                }
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E403.INVALID_OTP)
            }
        } catch (err) {
            consolelog("authVerifyOtp", err, false)
            return Promise.reject(err)
        }
    }
}

export const userController = new UserController();