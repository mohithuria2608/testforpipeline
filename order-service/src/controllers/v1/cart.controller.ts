import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { menuService, userService, promotionService, PromotionService } from '../../grpc/client'
import { sendSuccess } from '../../utils'
import * as ENTITY from '../../entity'

export class CartController {

    constructor() { }

    /**
     * @method POST
     * @param {string} curMenuId :current menu id
     * @param {number} menuUpdatedAt :current menu id
     * @param {number=} lat :latitude
     * @param {number=} lng :longitude
     * @param {string=} couponCode :couponCode
     * @param {Array} items :array of products
     * */
    async postCart(headers: ICommonRequest.IHeaders, payload: ICartRequest.IValidateCart, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await userService.fetchUser({ userId: auth.id })
            if (userData || !userData.id || userData.id != "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)

            let invalidMenu = false
            if (payload.lat && payload.lng) {
                let store: IStoreGrpcRequest.IStore[] = await ENTITY.OrderE.validateCoordinate(payload.lat, payload.lng)
                if (store && store.length > 0) {
                    if (store[0].menuId != payload.curMenuId)
                        invalidMenu = true
                } else
                    invalidMenu = true
            } else {
                const defaultMenu = await menuService.fetchMenu({
                    language: headers.language,
                    country: headers.country,
                    isDefault: true
                })
                if (
                    (defaultMenu.menuId != payload.curMenuId)
                    // || (defaultMenu.updatedAt > payload.menuUpdatedAt)
                ) {
                    invalidMenu = true
                }
            }
            let cmsValidatedCart = await ENTITY.CartE.createCartOnCMS(payload, userData)

            let res = await ENTITY.CartE.updateCart(payload.cartId, cmsValidatedCart, payload.items)
            res['invalidMenu'] = invalidMenu
            return res
        } catch (error) {
            consolelog(process.cwd(), "postCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GET
     * @param {string} cartId :current cart id
     * @param {number} cartUpdatedAt :cart last updated at
     * */
    async getCart(headers: ICommonRequest.IHeaders, payload: ICartRequest.IGetCart, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.CartE.getCart({ cartId: payload.cartId })
        } catch (error) {
            consolelog(process.cwd(), "getCart", error, false)
            return Promise.reject(error)
        }
    }
}

export const cartController = new CartController();