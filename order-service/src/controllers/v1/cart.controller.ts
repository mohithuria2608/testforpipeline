import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { menuService } from '../../grpc/client'
import { sendSuccess } from '../../utils'
import * as ENTITY from '../../entity'

export class CartController {

    constructor() { }

    /**
     * @param {string} curMenuId :current menu id
     * @param {number} menuUpdatedAt :current menu id
     * @param {number=} lat :latitude
     * @param {number=} lng :longitude
     * @param {Array} items :array of products
     * */
    async validateCart(payload: ICartRequest.IValidateCart) {
        try {
            const defaultMenu: IMenuServiceRequest.IFetchMenuRes = await menuService.fetchMenu({
                country: payload.country,
                isDefault: true
            })
            if (payload.lat && payload.lng) {
                //fetch menu according to lat, lng
                if ((defaultMenu.menuId != payload.curMenuId) || (defaultMenu.updatedAt > payload.menuUpdatedAt)) {
                    return sendSuccess(Constant.STATUS_MSG.SUCCESS.S202.MENU_CHANGED, {})
                } else {
                    let internalKeyCheck = await ENTITY.OrderE.mapInternalKeys(payload, defaultMenu)
                    if (internalKeyCheck) {
                        let res = await ENTITY.OrderE.createCheckoutRes(payload.items, defaultMenu)
                        return sendSuccess(Constant.STATUS_MSG.SUCCESS.S202.ITEM_CHANGED, res)
                    } else {
                        let res = await ENTITY.OrderE.createCheckoutRes(payload.items, defaultMenu)
                        return res
                    }
                }
            } else {
                if ((defaultMenu.menuId != payload.curMenuId) || (defaultMenu.updatedAt > payload.menuUpdatedAt)) {
                    return sendSuccess(Constant.STATUS_MSG.SUCCESS.S202.MENU_CHANGED, {})
                } else {
                    let internalKeyCheck = await ENTITY.OrderE.mapInternalKeys(payload, defaultMenu)
                    if (internalKeyCheck) {
                        let res = await ENTITY.OrderE.createCheckoutRes(payload.items, defaultMenu)
                        return sendSuccess(Constant.STATUS_MSG.SUCCESS.S202.ITEM_CHANGED, res)
                    } else {
                        let res = await ENTITY.OrderE.createCheckoutRes(payload.items, defaultMenu)
                        return res
                    }
                }
            }
        } catch (err) {
            consolelog("validateCart", err, false)
            return Promise.reject(err)
        }
    }

    async cartSuggestion(payload: ICartRequest.ICartSuggestion) {
        try {
            return []
        } catch (error) {

        }
    }
}

export const cartController = new CartController();