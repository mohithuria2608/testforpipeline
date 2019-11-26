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
            payload.items.map((elem, i) => {
                if (i == 1)
                    return elem['isAvailable'] = false
                else
                    return elem['isAvailable'] = true
            })
            return payload.items
            //step1 = if(lat and lng not present) => getDefault menu
            //step2 = validate defaultMenuId = curMenuId
            //step3 = if match  && update time=> return success
            //
            if (payload.lat != undefined && payload.lng != undefined) {
                //fetch default menu using country
                const defaultMenu = await menuService.fetchMenu({
                    country: payload.country,
                    isDefault: true
                })
                return defaultMenu
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