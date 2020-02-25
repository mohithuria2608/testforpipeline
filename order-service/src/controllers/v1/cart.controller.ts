import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { menuService, userService, promotionService } from '../../grpc/client'
import * as ENTITY from '../../entity'

export class CartController {

    constructor() { }

    /**
     * @method POST
     * @param {string} cartId :cartId
     * @param {string} curMenuId :current menu id
     * @param {number} menuUpdatedAt :current menu id
     * @param {number=} lat :latitude
     * @param {number=} lng :longitude
     * @param {string=} couponCode :couponCode
     * @param {Array} items :array of products
     * */
    async validateCart(headers: ICommonRequest.IHeaders, payload: ICartRequest.IValidateCart, auth: ICommonRequest.AuthorizationObj) {
        try {
            payload.orderType = payload.orderType ? payload.orderType : Constant.DATABASE.TYPE.ORDER.DELIVERY
            let storeOnline = true
            let promo: IPromotionGrpcRequest.IValidatePromotionRes
            let userData: IUserRequest.IUserData = await userService.fetchUser({ userId: auth.id })
            if (userData.id == undefined || userData.id == null || userData.id == "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            let checkCart = await ENTITY.CartE.getCart({ cartId: payload.cartId })
            if (!checkCart) {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)
            }

            let invalidMenu = false
            if (payload.lat && payload.lng) {
                let store: IStoreGrpcRequest.IStore[] = await ENTITY.OrderE.validateCoordinate(payload.lat, payload.lng)
                if (store && store.length > 0) {
                    if (store[0].menuId != payload.curMenuId) {
                        invalidMenu = true
                        storeOnline = store[0].isOnline
                    }
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
            if (payload.couponCode && payload.items && payload.items.length > 0) {
                promo = await promotionService.validatePromotion({ couponCode: payload.couponCode })
                if (!promo || (promo && !promo.isValid)) {
                    delete payload['couponCode']
                }
            } else
                delete payload['couponCode']
            let cmsValidatedCart = await ENTITY.CartE.createCartOnCMS(payload, userData)

            let res = await ENTITY.CartE.updateCart(payload.cartId, cmsValidatedCart, payload.items)
            res['invalidMenu'] = invalidMenu
            res['promo'] = promo
            res['storeOnline'] = storeOnline
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
            consolelog(process.cwd(), "getCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cartController = new CartController();