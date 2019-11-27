'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import * as fs from 'fs'
import { consolelog, sendSuccess } from '../utils'


export class OrderClass extends BaseEntity {
    constructor() {
        super('Order')
    }
    async mapInternalKeys(payload: ICartRequest.IValidateCart, defaultMenu: IMenuServiceRequest.IFetchMenuRes) {
        try {
            let change = false
            // if (defaultCategoryIndex >= 0) {
            payload.items.map((item, j) => {
                item['isAvailable'] = true
                item['isPriceChange'] = false
                let defaultCategoryIndex = -1
                defaultMenu.categories.map((cat, i) => {
                    console.log("cat.id == item.categoryId", cat.id, item.categoryId)

                    if (cat.id == item.categoryId) {
                        defaultCategoryIndex = i
                    }
                })
                console.log("defaultCategoryIndex, typeof defaultCategoryIndex, (defaultCategoryIndex >= 0)", defaultCategoryIndex, typeof defaultCategoryIndex, (defaultCategoryIndex >= 0))
                if (defaultCategoryIndex >= 0) {

                    let productIndex = -1
                    defaultMenu.categories[defaultCategoryIndex].products.map((product, j) => {
                        if (product.id == item.id) {
                            productIndex = j
                        }
                    })
                    if (productIndex >= 0) {
                        if (item.steps && item.steps.length > 0) {
                            let validStepStore = {}
                            let validOptionIdStore = {}
                            let validOptionPriceStore = {}
                            item.steps.map((curStep, k) => {
                                defaultMenu.categories[defaultCategoryIndex].products[productIndex].steps.map((defaultStep, l) => {
                                    if (curStep.title_en == defaultStep.title_en) {
                                        validStepStore[curStep.title_en] = validStepStore[curStep.title_en] ? validStepStore[curStep.title_en] + 1 : 1
                                        curStep.options.map(async (curOpt, m) => {
                                            defaultStep.options.map((defOpt, n) => {
                                                if (curOpt.id == defOpt.id) {
                                                    validOptionIdStore[curOpt.id] = validOptionIdStore[curOpt.id] ? validOptionIdStore[curOpt.id] + 1 : 1;
                                                    if (curOpt.price != defOpt.price) {
                                                        validOptionPriceStore[curOpt.id] = -1
                                                    }
                                                } else {
                                                    if (n == curStep.options.length - 1 && !validOptionIdStore.hasOwnProperty(curOpt.id)) {
                                                        validOptionIdStore[curOpt.id] = -1
                                                        validOptionPriceStore[curOpt.id] = -1
                                                    }
                                                }
                                            })
                                        })
                                    } else {
                                        if (k == item.steps.length - 1 && !validStepStore.hasOwnProperty(curStep.title_en))
                                            validStepStore[curStep.title_en] = -1
                                    }
                                })
                            })
                            consolelog("validStepStore", validStepStore, true)
                            consolelog("validOptionIdStore", validOptionIdStore, true)
                            consolelog("validOptionPriceStore", validOptionPriceStore, true)

                            let isValidStep = true;
                            let validOptionId = true;
                            let validOptionPrice = true;
                            Object.keys(validStepStore).filter(elem => {
                                if (validStepStore[elem] == -1)
                                    isValidStep = false
                            })
                            Object.keys(validOptionIdStore).filter(elem => {
                                if (validOptionIdStore[elem] == -1)
                                    validOptionId = false
                            })
                            Object.keys(validOptionPriceStore).filter(elem => {
                                if (validOptionPriceStore[elem] == -1)
                                    validOptionPrice = false
                            })
                            if (!isValidStep || !validOptionId) {
                                change = true
                                item['isAvailable'] = false
                            }
                            else
                                item['isAvailable'] = true

                            if (!validOptionPrice) {
                                change = true
                                item['isPriceChange'] = true
                            } else
                                item['isPriceChange'] = false

                        } else {
                            item['isAvailable'] = true
                            if (item.price != defaultMenu.categories[defaultCategoryIndex].products[productIndex].price)
                                item['isPriceChange'] = false
                        }
                    } else {
                        change = true
                        item['isAvailable'] = false
                        item['isPriceChange'] = false
                    }
                } else {
                    change = true
                    item['isAvailable'] = false
                    item['isPriceChange'] = false
                }
                return
            })
            // } else {
            //     return sendSuccess(Constant.STATUS_MSG.SUCCESS.S202.MENU_CHANGED, {})
            // }

            return change
        } catch (error) {
            consolelog("mapInternalKeys", error, false)
            return Promise.reject(error)
        }
    }

    async createCheckoutRes(items: IMenuServiceRequest.IProduct[], defaultMenu: IMenuServiceRequest.IFetchMenuRes) {
        try {
            let amount = []

            let subTotal = 0;
            let delivery = {
                rate: 6.5,
                type: "add"
            }
            items.map((elem, i) => {
                if (elem.price)
                    subTotal = subTotal + elem.price
                if (elem.steps && elem.steps.length > 0) {
                    if (elem.steps && elem.steps.length > 0) {
                        elem.steps.map(stepObj => {
                            if (stepObj && stepObj.options && stepObj.options.length > 0) {
                                stepObj.options.map(optionObj => {
                                    if (optionObj.selected == 1) {
                                        if (optionObj.price)
                                            subTotal = subTotal + optionObj.price
                                    }
                                })
                            }
                        })
                    }
                }
            })
            amount.push({
                type: 'subTotal',
                longName: 'Sub Total',
                shortName: 'Sub Total',
                rate: subTotal,
                action: "display"
            })
            let taxRawdata = fs.readFileSync(__dirname + '/../../model/tax.json', 'utf-8');
            let tax = JSON.parse(taxRawdata);
            if (tax && typeof tax == 'object' && tax.length > 0) {
                tax.map(obj => {
                    if (obj.inclusive == true) {
                        amount.push({
                            longName: obj.longName,
                            shortName: obj.shortName,
                            rate: (100 * 100) / (obj.rate + 1) * 100,
                            inclusive: obj.inclusive,
                            type: "tax",
                            action: "add"
                        })
                    }
                    return
                })
            }
            amount.push({
                longName: 'Delivery Charge',
                shortName: 'Delivery Charge',
                rate: 6.5,
                type: "delivery",
                action: "add"
            })
            let grandTotal = subTotal + delivery.rate
            amount.push({
                longName: 'Grand Total',
                shortName: 'Grand Total',
                rate: grandTotal,
                type: "total",
                action: "display"
            })
            return {
                items: items,
                amount: amount
            }
        } catch (error) {
            consolelog("createCheckoutRes", error, false)
            return Promise.reject(error)
        }
    }
}

export const OrderE = new OrderClass()
