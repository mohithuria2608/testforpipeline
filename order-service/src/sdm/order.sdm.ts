'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseSDM } from './base.sdm'
import { consolelog } from '../utils'
import * as  _ from 'lodash';

export class OrderSDMEntity extends BaseSDM {

    constructor() {
        super()
    }

    // {
    //     "licenseCode": "AmericanaWeb",
    //     "conceptID": "3",
    //     "order": {
    //         "AddressID": "10084693",
    //         "AreaID": "538",
    //         "BackupStoreID": "2",
    //         "ConceptID": "3",
    //         "CustomerID": "7323013",
    //         "Entries": {
    //             "CEntry": [
    //                 {
    //                     "ItemID": "110002",
    //                     "Level": "0",
    //                     "ModCode": "NONE",
    //                     "Name": "Kids Chicken Meal",
    //                     "OrdrMode": "OM_SAVED",
    //                     "Price": "13",
    //                     "Status": "NOTAPPLIED"
    //                 },
    //                 {
    //                     "ItemID": "110002",
    //                     "Level": "0",
    //                     "ModCode": "NONE",
    //                     "Name": "Kids Chicken Meal",
    //                     "OrdrMode": "OM_SAVED",
    //                     "Price": "13",
    //                     "Status": "NOTAPPLIED"
    //                 },
    //                 {
    //                     "ItemID": "110002",
    //                     "Level": "0",
    //                     "ModCode": "NONE",
    //                     "Name": "Kids Chicken Meal",
    //                     "OrdrMode": "OM_SAVED",
    //                     "Price": "13",
    //                     "Status": "NOTAPPLIED"
    //                 }
    //             ]
    //         },
    //         "OrderMode": "1",
    //         "OriginalStoreID": "65",
    //         "PaidOnline": "0",
    //         "ServiceCharge": "0.25",
    //         "Source": "4",
    //         "Status": "0",
    //         "StoreID": "65",
    //         "SubTotal": "2.75",
    //         "Total": "3.0",
    //         "ValidateStore": "1"
    //     },
    //     "autoApprove": "true",
    //     "useBackupStoreIfAvailable": "true",
    //     "creditCardPaymentbool": "false",
    //     "menuTemplateID": "17"
    // }
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
    async getOrderDetail(payload: IOrderSdmRequest.IOrderDetail) {
        try {
            let data = {
                name: "GetOrderDetails",
                req: {
                    licenseCode: "AmericanaWeb",
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
                    licenseCode: "AmericanaWeb",
                    conceptID: "3",
                    language: "En",
                    orderID: payload.sdmOrderRef,
                    paymentType: 2,
                    paymentSubType: 1,
                    paymentTenderID: 34,
                    amount: "3.0",// payload.transaction.amount,
                    holderName: "Test payment user",
                    cardNumber: payload.transaction.paymentDetails.paymentInfo,
                    cardCCV: "123",
                    cardExpire: payload.transaction.paymentDetails.expiryYear,
                    refNumber: payload.transaction.transaction[0].id,
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
