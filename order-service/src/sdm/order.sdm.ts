'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseSDM } from './base.sdm'
import { consolelog } from '../utils'
import * as  _ from 'lodash';
import { kafkaService } from '../grpc/client';

export class OrderSDMEntity extends BaseSDM {

    constructor() {
        super()
    }

    /**
    * @method SDK
    * */
    async createOrder(payload: IOrderSdmRequest.ICreateOrder) {
        try {
            let data = {
                name: "UpdateOrder",
                req: payload
                // {
                //     "licenseCode": Constant.SERVER.SDM.LICENSE_CODE,
                //     "conceptID": "3",
                //     "order": payload,
                //     "autoApprove": "true",
                //     "useBackupStoreIfAvailable": "true",
                //     "creditCardPaymentbool": "false",
                //     "menuTemplateID": "17"
                // }
            }
            kafkaService.kafkaSync({
                set: Constant.SET_NAME.LOGGER,
                mdb: {
                    create: true,
                    argv: JSON.stringify({
                        type: Constant.DATABASE.TYPE.ACTIVITY_LOG.SDM_REQUEST,
                        info: {
                            request: {
                                body: data.req
                            }
                        },
                        description: "",
                        options: {
                            env: Constant.SERVER.ENV[config.get("env")],
                        },
                        createdAt: new Date().getTime(),
                    })
                }
            })

            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.UpdateOrderResult
            else
                return Promise.reject(JSON.stringify(res))
        } catch (error) {
            consolelog(process.cwd(), 'createOrder', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
   * @method SDK
   * */
    async updateOrder(payload) {
        try {
            let data = {
                name: "UpdateOrder",
                req: payload
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.UpdateOrderResult
            else
                return Promise.reject(JSON.stringify(res))
        } catch (error) {
            consolelog(process.cwd(), 'updateOrder', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDK
    * */
    async getOrderDetail(payload: IOrderSdmRequest.IOrderDetail) {
        try {
            let data = {
                name: "GetOrderDetails",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    conceptID: "3",
                    language: "En",
                    orderID: payload.sdmOrderRef,
                    menuTemplateID: "17"
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.GetOrderDetailsResult
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), 'getOrderDetail', JSON.stringify(error), false)
            return (error)
        }
    }

    async processCreditCardOnSdm(payload: IOrderSdmRequest.IProcessCreditCardOnSdm) {
        try {
            let data = {
                name: "ProcessCreditCardPayment",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    conceptID: "3",
                    language: "En",
                    orderID: payload.sdmOrderRef,
                    paymentType: 2,
                    paymentSubType: 1,
                    paymentTenderID: 34,
                    amount: payload.transaction.amount,
                    holderName: "Test payment user",
                    cardNumber: payload.transaction.paymentDetails.paymentInfo,
                    cardCCV: "123",
                    cardExpire: payload.transaction.paymentDetails.expiryYear,
                    refNumber: payload.transaction.transactions[0].id,
                    refCountry: payload.transaction.paymentDetails.cardCountry,
                    refGateway: "noonpay",
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.ProcessCreditCardPaymentResult
            else {
                return false
            }
        } catch (error) {
            consolelog(process.cwd(), 'getOrderDetail', JSON.stringify(error), false)
            return (error)
        }
    }
}

export const OrderSDME = new OrderSDMEntity()
