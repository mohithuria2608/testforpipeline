import * as Constant from '../../constant'
import { consolelog } from '../../utils'

export class GuestController {

    constructor() { }

    async guestLogin(payload: IGuestRequest.IGuestLogin) {
        try {
            
            return payload
        } catch (err) {
            consolelog("guestLogin", err, false)
            return Promise.reject(err)
        }
    }
}

export const guestController = new GuestController();