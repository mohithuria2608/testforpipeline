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
            // let queryArg: IAerospike.Query = {
            //     equal: {
            //         bin: "sessionId",
            //         value: headers.deviceid
            //     },
            //     set: 'user',
            //     background: false,
            // }
            // let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            // let user: IUserRequest.IUserData
            // if (checkUser && checkUser.length > 0) {
            //     user = checkUser[0]
            // } else {
            let userCreate = {
                profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                isGuest: 1,
            }
            let sessionCreate: IUserRequest.ISessionUpdate = {
                otp: 0,
                otpExpAt: 0,
                otpVerified: 1,
                isLogin: 1
            }
            let user: IUserRequest.IUserData = await ENTITY.UserE.createUser(headers, userCreate, sessionCreate)
            // }

            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                user.id
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(user, headers.deviceid) }
        } catch (err) {
            consolelog(process.cwd(), "guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const guestController = new GuestController();