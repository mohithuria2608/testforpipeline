import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { menuService } from '../../grpc/client'
import * as fs from 'fs'

export class CartController {

    constructor() { }

    /**
     * @param {string} curMenuId :current menu id
     * @param {number=} lat :latitude
     * @param {number=} lng :longitude
     * */
    async validateCart(payload: ICartRequest.IValidateCart) {
        try {
            let subTotal = 0;
            let delivery = {
                rate: 6.5,
                type: "add"
            }
            payload.items.map((elem, i) => {
                if (elem.price)
                    subTotal = subTotal + elem.price
                if (elem.steps && elem.steps.length > 0) {
                    if (elem.steps.options && elem.steps.options.length > 0) {
                        if (elem.steps.options.selected == 1) {
                            if (elem.steps.options.price)
                                subTotal = subTotal + elem.steps.options.price
                        }
                    }
                }

                if (i == 1)
                    return elem['isAvailable'] = false
                else
                    return elem['isAvailable'] = true
            })
            let taxRawdata = fs.readFileSync(__dirname + '/../../../model/tax.json', 'utf-8');
            let tax = JSON.parse(taxRawdata);
            if (tax && typeof tax == 'object' && tax.length > 0) {
                tax = tax.filter(elem => {
                    elem = {
                        longName: elem.longName,
                        shortName: elem.shortName,
                        rate: elem.rate,
                        inclusive: elem.inclusive,
                        type: "add"
                    }
                    return elem.inclusive == true
                })
            }
            let grandTotal = subTotal + delivery.rate
            return {
                items: payload.items,
                amount: {
                    subTotal: subTotal,
                    tax: tax,
                    delivery: delivery,
                    promo: [],
                    grandTotal: grandTotal
                }
            }
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

    async cartSuggestion(payload: ICartRequest.ICartSuggestion) {
        try {
            return []
        } catch (error) {

        }
    }
}

export const cartController = new CartController();