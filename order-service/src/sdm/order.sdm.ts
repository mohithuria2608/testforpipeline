'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseSDM } from './base.sdm'
import { consolelog } from '../utils'
import * as  _ from 'lodash';

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
            }

            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.UpdateOrderResult
            else if (res && res.SDKResult && (res.SDKResult.ResultCode == "0"))
                return res.SDKResult
            else
                return Promise.reject(res)
        } catch (error) {
            consolelog(process.cwd(), 'createOrder', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDK
    * @description : get order details
    * */
    async getOrderDetail(payload: IOrderSdmRequest.IOrderDetail) {
        try {
            let data = {
                name: "GetOrderDetails",
                req: {
                    licenseCode: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.LICENSE_CODE,
                    conceptID: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.CONCEPT_ID,
                    language: payload.language.toLowerCase().trim(),
                    orderID: payload.sdmOrderRef,
                    menuTemplateID: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.MENU_TEMPLATE_ID
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.GetOrderDetailsResult
            else if (res && res.SDKResult && (res.SDKResult.ResultCode == "0"))
                return res.SDKResult
            else
                return Promise.reject(res)
        } catch (error) {
            consolelog(process.cwd(), 'getOrderDetail', JSON.stringify(error), false)
            return (error)
        }
    }

    /**
    * @method SDK
    * @description : get active order
    * */
    async getActiveOrders(payload: IOrderSdmRequest.IGetActiveOrder) {
        try {
            let data = {
                name: "GetActiveOrdersStatusList",
                req: {
                    licenseCode: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.LICENSE_CODE,
                    language: payload.language.toLowerCase().trim(),
                    conceptID: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.CONCEPT_ID,
                    source: 23
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.GetOrderDetailsResult
            else if (res && res.SDKResult && (res.SDKResult.ResultCode == "0"))
                return res.SDKResult
            else
                return Promise.reject(res)
        } catch (error) {
            consolelog(process.cwd(), 'getActiveOrders', JSON.stringify(error), false)
            return (error)
        }
    }

    async processCreditCardOnSdm(payload: IOrderSdmRequest.IProcessCreditCardOnSdm) {
        try {
            let data = {
                name: "ProcessCreditCardPayment",
                req: {
                    licenseCode: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.LICENSE_CODE,
                    conceptID: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.CONCEPT_ID,
                    language: payload.language.toLowerCase().trim(),
                    orderID: payload.sdmOrderRef,
                    paymentType: Constant.CONF.PAYMENT[Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE].codInfo.SDM.PAY_TYPE,
                    paymentSubType: Constant.CONF.PAYMENT[Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE].codInfo.SDM.PAY_SUB_TYPE,
                    paymentStatus: Constant.CONF.PAYMENT[Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE].codInfo.SDM.PAY_STATUS,
                    paymentTenderID: Constant.CONF.PAYMENT[Constant.DATABASE.STORE_CODE.MAIN_WEB_STORE].codInfo.SDM.PAY_STORE_TENDERID,
                    amount: payload.transaction.amount,
                    refNumber: payload.transaction.transactions[0].id,
                    refGateway: "noonpay",
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.ProcessCreditCardPaymentResult
            else if (res && res.SDKResult && (res.SDKResult.ResultCode == "0"))
                return res.SDKResult
            else
                return false
        } catch (error) {
            consolelog(process.cwd(), 'processCreditCardOnSdm', JSON.stringify(error), false)
            return (error)
        }
    }

    /**
    * @method SDK
    * @description : get order details
    * */
    async cancelOrder(payload: IOrderSdmRequest.ICancelOrder) {
        try {
            if (payload.sdmOrderRef) {
                let data = {
                    name: "CancelOrder",
                    req: {
                        licenseCode: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.LICENSE_CODE,
                        conceptID: Constant.CONF.COUNTRY_SPECIFIC[payload.country].SDM.CONCEPT_ID,
                        language: payload.language.toLowerCase(),
                        orderID: payload.sdmOrderRef,
                        voidReason: payload.voidReason,
                        voidRemarks: payload.validationRemarks
                    }
                }
                let res = await this.requestData(data.name, data.req)
                if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                    return res.GetOrderDetailsResult
                else if (res && res.SDKResult && (res.SDKResult.ResultCode == "0"))
                    return res.SDKResult
                else
                    return Promise.reject(res)
            } else {
                return {}
            }
        } catch (error) {
            consolelog(process.cwd(), 'cancelOrder', JSON.stringify(error), false)
            return (error)
        }
    }
}

export const OrderSDME = new OrderSDMEntity()
