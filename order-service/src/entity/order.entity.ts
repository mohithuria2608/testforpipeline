'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import * as CMS from "../cms"
import { Aerospike } from '../aerospike'
import { kafkaService, paymentService } from '../grpc/client';
import { SDM } from '../sdm';


export class OrderClass extends BaseEntity {
    constructor() {
        super('order')
    }
    /**
    * @method INTERNAL
    */
    async syncOrder(payload) {
        try {
            let sdmOrderChange = {
                set: this.set,
                sdm: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            kafkaService.kafkaSync(sdmOrderChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncOrder", error, false)
            return Promise.reject(error)
        }
    }

    async createOrderOnCMS(payload) {
        try {
            let cmsOrder = await CMS.OrderCMSE.createOrder({})
            return cmsOrder
        } catch (error) {
            consolelog(process.cwd(), "createOrderOnCMS", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * */
    async createSdmOrder(payload: ICartRequest.ICartData) {
        try {
            /**
             * @step 1 :create order on sdm 
             * @step 2 :update mongo order using payload.cartId sdmOrderRef
             */

            return {}
        } catch (error) {
            consolelog(process.cwd(), "createSdmOrder", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * */
    async createOrder(cartData: ICartRequest.ICartData, address: IUserGrpcRequest.IFetchAddressRes, store: IStoreGrpcRequest.IStore) {
        try {
            let orderData = {
                cartId: cartData.cartId,
                cmsCartRef: cartData.cmsCartRef,
                sdmOrderRef: 0,
                cmsOrderRef: 0,
                userId: cartData.userId,
                orderId: cartData.orderId,
                status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO,
                items: cartData.items,
                amount: cartData.amount,
                address: {
                    addressId: address.id,
                    sdmStoreRef: address.sdmStoreRef,
                    sdmAddressRef: address.sdmAddressRef,
                    cmsAddressRef: address.cmsAddressRef,
                    tag: address.tag,
                    bldgName: address.bldgName,
                    description: address.description,
                    flatNum: address.flatNum,
                    addressType: address.addressType,
                    lat: address.lat,
                    lng: address.lng
                },
                store: {
                    sdmStoreRef: store.storeId,
                    areaId: store.areaId,
                    location: store.location,
                    address_en: store.address_en,
                    address_ar: store.address_ar,
                    name_en: store.name_en,
                    name_ar: store.name_ar
                },
                payment: {},
                transLogs: [],
                createdAt: new Date().getTime(),
                updatedAt: 0
            }
            let order: IOrderRequest.IOrderData = await this.createOneEntityMdb(orderData)
            return order
        } catch (error) {
            consolelog(process.cwd(), "createOrder", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} orderId : order id
    * @param {string} status : mongo order status
    * @param {string} sdmOrderRef : sdm order id
    * @param {string} timeInterval : set timeout interval
    * */
    async getSdmOrder(payload: IOrderRequest.IGetSdmOrder) {
        try {
            setTimeout(async () => {
                let order = await this.getOneEntityMdb({ cartId: payload.cartId }, { items: 0 })
                if (order && order._id) {
                    if (order.sdmOrderRef && order.sdmOrderRef != 0) {
                        let sdmOrder = await SDM.OrderSDME.getOrderDetail({})
                        /**
                         * @step 1 : update mongo order status wrt to sdmOrder status
                         */
                        if (sdmOrder && sdmOrder.id) {
                            order = await this.updateOneEntityMdb({ cartId: payload.cartId }, {
                                status: sdmOrder.status,
                                updatedAt: new Date().getTime()
                            }, { new: true })
                            if (payload.status == Constant.DATABASE.STATUS.ORDER.CLOSED.SDM ||
                                payload.status == Constant.DATABASE.STATUS.ORDER.CANCELED.SDM ||
                                payload.status == Constant.DATABASE.STATUS.ORDER.FAILURE.SDM) {

                            } else {
                                if (order.status == Constant.DATABASE.STATUS.ORDER.CONFIRMED.MONGO && payload.status == Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.SDM) {
                                    let amount = order.amount.reduce((init, elem) => {
                                        if (elem.type == "TOTAL")
                                            return init + elem.amount
                                    }, 0)
                                    /**
                                     * @description step 1 create transaction log on CMS for initiating capture
                                     * @description step 2 capture payment on noonpay
                                     * @description step 3 create transaction log on CMS for capture
                                     */
                                    this.updateOneEntityMdb({ cartId: payload.cartId }, {
                                        status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO,
                                        $addToSet: {
                                            transLogs: {
                                                noonpayOrderId: order.transLogs[0].noonpayOrderId,
                                                orderId: order.transLogs[0].orderId,
                                                amount: amount,
                                                storeCode: "kfc_uae_store",
                                                createdAt: new Date().getTime()
                                            }
                                        }
                                    })
                                    let paymentCapturedObj = await paymentService.capturePayment({
                                        noonpayOrderId: order.transLogs[0].noonpayOrderId,
                                        orderId: order.transLogs[0].orderId,
                                        amount: amount,
                                        storeCode: "kfc_uae_store"
                                    })
                                    this.updateOneEntityMdb({ cartId: payload.cartId }, {
                                        $addToSet: {
                                            transLogs: { ...paymentCapturedObj, createdAt: new Date().getTime() }
                                        }
                                    })
                                }
                                let orderChange = {
                                    set: this.set,
                                    sdm: {
                                        get: true,
                                        argv: JSON.stringify(payload)
                                    }
                                }
                                kafkaService.kafkaSync(orderChange)
                            }
                        }
                    } else {
                        let orderChange = {
                            set: this.set,
                            sdm: {
                                get: true,
                                argv: JSON.stringify(payload)
                            }
                        }
                        kafkaService.kafkaSync(orderChange)
                    }
                }
            }, payload.timeInterval)

            return {}
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrder", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method AGGREGATE
    * @param {number} page : page number
    * */
    async getOrderHistory(payload: IOrderRequest.IOrderHistory, auth: ICommonRequest.AuthorizationObj) {
        try {
            let nextPage
            let limit = 11
            let skip = (limit * (payload.page - 1));
            let pipeline = [
                {
                    $match: {
                        userId: auth.id
                    }
                },
                {
                    $addFields: {
                        isPreviousOrder: true
                    }
                },
                { $sort: { isPreviousOrder: 1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $project: {
                        transLogs: 0,
                    }
                }
            ]
            let getOrderHistory: IOrderRequest.IOrderData[] = await this.aggregateMdb(pipeline, { lean: true })
            nextPage = (getOrderHistory.length == limit) ? (payload.page + 1) : -1
            return {
                list: getOrderHistory,
                nextPage: nextPage,
                currentPage: parseInt(payload.page.toString())
            }
        } catch (error) {
            consolelog(process.cwd(), "getOrderHistory", error, false)
            return Promise.reject(error)
        }
    }
}

export const OrderE = new OrderClass()
