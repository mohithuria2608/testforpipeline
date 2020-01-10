import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { menuService, userService } from '../../grpc/client'
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
     * @param {Array} items :array of products
     * */
    async postCart(headers: ICommonRequest.IHeaders, payload: ICartRequest.IValidateCart, auth: ICommonRequest.AuthorizationObj) {
        try {
            auth.userData = await userService.fetchUserById({ id: auth.id })
            let invalidMenu = false
            if (payload.lat && payload.lng) {
                let store: IStoreGrpcRequest.IStore[] = await ENTITY.OrderE.validateCoordinate(payload.lat, payload.lng)
                if (store && store.length > 0) {
                    if (store[0].menuId != payload.curMenuId)
                        invalidMenu = true
                } else
                    invalidMenu = true
            } else {
                const defaultMenu: IMenuGrpcRequest.IFetchMenuRes = await menuService.fetchMenu({
                    country: headers.country,
                    isDefault: true
                })
                if ((defaultMenu.menuId != payload.curMenuId) || (defaultMenu.updatedAt > payload.menuUpdatedAt)) {
                    invalidMenu = true
                }
            }

            // let cmsValidatedCart = await ENTITY.OrderE.createCartOnCMS(payload, auth.userData)
            let saveCart = await ENTITY.OrderE.updateCart(payload)
            let res = await ENTITY.OrderE.createCartRes(payload, invalidMenu, auth.userData)
            return res
        } catch (err) {
            consolelog(process.cwd(), "postCart", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GET
     * @param {string} cartId :current cart id
     * @param {number} cartUpdatedAt :cart last updated at
     * */
    async getCart(headers: ICommonRequest.IHeaders, payload: ICartRequest.IGetCart, auth: ICommonRequest.AuthorizationObj) {
        try {
            return await ENTITY.OrderE.getById({ id: payload.cartId })
        } catch (err) {
            consolelog(process.cwd(), "getCart", err, false)
            return Promise.reject(err)
        }
    }
}

export const cartController = new CartController();