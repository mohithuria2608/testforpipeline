import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { menuService } from '../../grpc/client'
export class CartController {

    constructor() { }

    /**
     * @param {string} curMenuId :current menu id
     * @param {number=} lat :latitude
     * @param {number=} lng :longitude
     * */
    async validateCart(payload: ICartRequest.IValidateCart) {
        try {
            //step1 = if(lat and lng not present) => getDefault menu
            //step2 = validate defaultMenuId = curMenuId
            //step3 = if match  && update time=> return success
            //
            if (payload.lat != undefined && payload.lng != undefined) {
                //fetch default menu using country
                // menuService.fetchMenu()
            } else {

            }
            return {}
        } catch (err) {
            consolelog("validateCart", err, false)
            return Promise.reject(err)
        }
    }
}

export const cartController = new CartController();