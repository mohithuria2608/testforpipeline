import * as Constant from '../../constant'
import { authService } from '../../grpc'
import { consolelog } from '../../utils'

export class GuestController {

    constructor() { }

    async guestLogin(payload: IGuestRequest.IGuestLogin) {
        try {
            const dataToCreateToken: IAuthServiceRequest.ICreateToken = {
                deviceId: payload.deviceId
            }
            
            let response = await authService.createToken(dataToCreateToken)
            return response
        } catch (err) {
            consolelog("guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const guestController = new GuestController();