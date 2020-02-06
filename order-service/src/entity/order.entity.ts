'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import * as CMS from "../cms"
import { kafkaService, paymentService } from '../grpc/client';
import { OrderSDME } from '../sdm';


export class OrderClass extends BaseEntity {
    constructor() {
        super('order')
    }
    /**
    * @method INTERNAL
    * @description Sync order request in KAFKA for creating order on SDM
    */
    async syncOrder(payload: ICartRequest.ICartData) {
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
            consolelog(process.cwd(), "syncOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createOrderOnCMS(payload) {
        try {
            let cmsOrder = await CMS.OrderCMSE.createOrder({})
            return cmsOrder
        } catch (error) {
            consolelog(process.cwd(), "createOrderOnCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @description : Create order on SDM
    * */
    async createSdmOrder(payload: ICartRequest.ICartData) {
        try {
            /**
             * @step 1 :create order on sdm 
             * @step 2 :update mongo order using payload.cartId sdmOrderRef
             */
            let data: IOrderSdmRequest.ICreateOrder = {}
            let createOrder = await OrderSDME.createOrder(data)
            if (createOrder) {
                let order = await this.updateOneEntityMdb({ cartId: payload.cartId }, {
                    sdmOrderRef: createOrder,
                    isActive: 1,
                    updatedAt: new Date().getTime()
                }, { new: true })
                if (order && order._id) {
                    this.getSdmOrder({
                        sdmOrderRef: order.sdmOrderRef,
                        timeInterval: Constant.KAFKA.SDM.ORDER.INTERVAL.GET_STATUS,
                        status: Constant.DATABASE.STATUS.ORDER.PENDING.MONGO
                    })
                }
                return {}
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.CREATE_ORDER_ERROR)
        } catch (error) {
            consolelog(process.cwd(), "createSdmOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method INTERNAL
    * */
    async createOrder(orderType: string, cartData: ICartRequest.ICartData, address: IUserGrpcRequest.IFetchAddressRes, store: IStoreGrpcRequest.IStore) {
        try {
            let orderData = {
                orderType: orderType,
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
                updatedAt: 0,
                isActive: 1,
            }
            let order: IOrderRequest.IOrderData = await this.createOneEntityMdb(orderData)
            return order
        } catch (error) {
            consolelog(process.cwd(), "createOrder", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} status : mongo order status
    * @param {string} sdmOrderRef : sdm order id
    * @param {string} timeInterval : set timeout interval
    * */
    async getSdmOrder(payload: IOrderRequest.IGetSdmOrder) {
        try {
            let recheck = true
            setTimeout(async () => {
                let order = await this.getOneEntityMdb({ sdmOrderRef: payload.sdmOrderRef }, { items: 0, amount: 0 })
                if (order && order._id) {
                    if (order.sdmOrderRef && order.sdmOrderRef != 0) {
                        let sdmOrder = await OrderSDME.getOrderDetail({ sdmOrderRef: order.sdmOrderRef })
                        /**
                         * @step 1 : update mongo order status wrt to sdmOrder status
                         */
                        if (sdmOrder && sdmOrder.OrderID) {
                            if (Constant.DATABASE.STATUS.ORDER.CLOSED.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 1", sdmOrder.Status, true)
                                recheck = false
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.CLOSED.MONGO,
                                    updatedAt: new Date().getTime()
                                })
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.CANCELED.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 2", sdmOrder.Status, true)
                                recheck = false
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.CANCELED.MONGO,
                                    updatedAt: new Date().getTime()
                                })
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.FAILURE.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 3", sdmOrder.Status, true)
                                recheck = false
                                this.updateOneEntityMdb({ _id: order._id }, {
                                    isActive: 0,
                                    status: Constant.DATABASE.STATUS.ORDER.FAILURE.MONGO,
                                    updatedAt: new Date().getTime()
                                })
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.PENDING.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 4", sdmOrder.Status, true)
                                if (sdmOrder.Status == 0 && order.payment.status == "AUTHORIZATION") {
                                    consolelog(process.cwd(), "STATE : 5", sdmOrder.Status, true)
                                    /**
                                    * @description : add payment object to sdm
                                    */
                                }
                            }
                            else if (Constant.DATABASE.STATUS.ORDER.CONFIRMED.SDM.indexOf(parseInt(sdmOrder.Status)) >= 0) {
                                consolelog(process.cwd(), "STATE : 6", sdmOrder.Status, true)
                                if (order.payment.status == "AUTHORIZATION") {
                                    consolelog(process.cwd(), "STATE : 7", sdmOrder.Status, true)
                                    order = await this.updateOneEntityMdb({ _id: order._id }, {
                                        status: Constant.DATABASE.STATUS.ORDER.CONFIRMED.MONGO,
                                        updatedAt: new Date().getTime()
                                    }, { new: true })
                                    let paymentCapturedObj = await paymentService.capturePayment({
                                        noonpayOrderId: order.transLogs[0].noonpayOrderId,
                                        orderId: order.transLogs[0].orderId,
                                        amount: order.payment.amount,
                                        storeCode: "kfc_uae_store"
                                    })
                                    this.updateOneEntityMdb({ _id: order._id }, {
                                        status: Constant.DATABASE.STATUS.ORDER.BEING_PREPARED.MONGO,
                                        "order.payment.status": "CAPTURE",
                                        "order.payment.transactionId": paymentCapturedObj['transaction'][0]['id'],
                                        $addToSet: {
                                            transLogs: { ...paymentCapturedObj, createdAt: new Date().getTime() }
                                        },
                                        updatedAt: new Date().getTime()
                                    })
                                }
                            }
                            else {
                                recheck = false
                                consolelog(process.cwd(), `UNHANDLED SDM ORDER STATUS for orderId : ${parseInt(sdmOrder.Status)} : `, parseInt(sdmOrder.Status), true)
                            }
                        }
                        if (recheck) {
                            let orderChange = {
                                set: this.set,
                                sdm: {
                                    get: true,
                                    argv: JSON.stringify(payload)
                                },
                                count: -1
                            }
                            kafkaService.kafkaSync(orderChange)
                        }
                    }
                }
            }, payload.timeInterval)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrder", JSON.stringify(error), false)
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
            let pipeline = [];

            let match = { userId: auth.id }
            if (payload.isActive == 1)
                match['isActive'] = payload.isActive
            pipeline.push({
                $match: match
            })
            if (payload.isActive == 1) {
                pipeline.push({ $sort: { updatedAt: -1 } })
            } else {
                pipeline.push({ $sort: { isActive: -1, updatedAt: -1 } })
            }
            pipeline = pipeline.concat([
                { $skip: skip },
                { $limit: limit },
                {
                    $project: {
                        transLogs: 0,
                    }
                }
            ])
            let getOrderHistory: IOrderRequest.IOrderData[] = await this.aggregateMdb(pipeline, { lean: true })
            nextPage = (getOrderHistory.length == limit) ? (payload.page + 1) : -1
            return {
                list: getOrderHistory,
                nextPage: nextPage,
                currentPage: parseInt(payload.page.toString())
            }
        } catch (error) {
            consolelog(process.cwd(), "getOrderHistory", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const OrderE = new OrderClass()
