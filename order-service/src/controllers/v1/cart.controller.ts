import * as config from "config"
import * as Constant from '../../constant'
import { consolelog, hashObj } from '../../utils'
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
     * @param {Array} selectedFreeItem :{ar:[],en:[]}
     * */
    async validateCart(headers: ICommonRequest.IHeaders, payload: ICartRequest.IValidateCart, auth: ICommonRequest.AuthorizationObj) {
        try {
            payload.orderType = payload.orderType ? payload.orderType : Constant.DATABASE.TYPE.ORDER.DELIVERY.AS
            let userData: IUserRequest.IUserData = await userService.fetchUser({ userId: auth.id })
            if (userData.id == undefined || userData.id == null || userData.id == "")
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            let cart = await ENTITY.CartE.getCart({ cartId: payload.cartId })
            if (!cart)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CART_NOT_FOUND)

            let invalidMenu = 0
            if (payload.lat && payload.lng) {
                let store: IStoreGrpcRequest.IStore = await ENTITY.OrderE.validateCoordinate(payload.lat, payload.lng)
                if (store && store.id && store.id != "" && store.menuId == payload.curMenuId) {
                    if (!store.active)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E412.SERVICE_UNAVAILABLE)
                    invalidMenu = 1
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E412.SERVICE_UNAVAILABLE)
            }
            const menu = await menuService.fetchMenu({
                menuId: 1,
                language: headers.language,
            })
            if (menu.menuId && (menu.menuId != payload.curMenuId
                // || menu.updatedAt != payload.menuUpdatedAt
            ))
                invalidMenu = 1

            let hitCms = false
            if (payload.couponCode || (cart.couponApplied && (payload.couponCode == "" || !payload.couponCode)))
                hitCms = true
            if (config.get("sdm.promotion.default")) {
                hitCms = false
                payload.couponCode = config.get("sdm.promotion.defaultCode")
            }
            let promo: IPromotionGrpcRequest.IValidatePromotionRes
            if (payload.couponCode && payload.items && payload.items.length > 0) {
                promo = await promotionService.validatePromotion({ couponCode: payload.couponCode })
                if (!promo || (promo && !promo.isValid)) {
                    delete payload['couponCode']
                }
            } else
                delete payload['couponCode']

            let cmsCart = hitCms ? await ENTITY.CartE.createCartOnCMS(payload) : await ENTITY.CartE.createSudoCartOnCMS(payload, promo)
            console.log("cmsCart", JSON.stringify(cmsCart))
            cart = await ENTITY.CartE.updateCart({
                headers: headers,
                orderType: payload.orderType,
                cartId: payload.cartId,
                cmsCart: cmsCart,
                curItems: payload.items,
                selFreeItem: payload.selFreeItem,
                invalidMenu: invalidMenu,
                promo: promo,
            })
            let res: any = { ...cart }
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