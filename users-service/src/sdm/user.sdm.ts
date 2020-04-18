'use strict';
import * as Constant from '../constant'
import { BaseSDM } from './base.sdm'
import { consolelog, nameConstructor, deCryptData, phnNoConstructor } from '../utils'
import * as  _ from 'lodash';
import { notificationService } from '../grpc/client'

export class UserSDMEntity extends BaseSDM {

    constructor() {
        super()
    }

    /**
    * @method SDK
    * */
    async createCustomerOnSdm(userData: IUserRequest.IUserData, headers: ICommonRequest.IHeaders) {
        try {
            let naemRes = nameConstructor(userData.name.trim())
            let data: IUserSDMRequest.ICreateUserReq = {
                name: "RegisterCustomer",
                req: {
                    licenseCode: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SDM.LICENSE_CODE,
                    language: headers.language.toLowerCase(),
                    customer: {
                        CUST_CLASSID: -1,
                        CUST_EMAIL: userData.email,
                        CUST_FIRSTNAME: naemRes.firstName,
                        CUST_LASTNAME: naemRes.lastName,
                        CUST_NATID: -1,
                        CUST_NOTIFICATION_MOBILE: phnNoConstructor(userData.phnNo, userData.cCode).CUST_NOTIFICATION_MOBILE,
                        CUST_PHONEAREACODE: phnNoConstructor(userData.phnNo, userData.cCode).CUST_PHONEAREACODE,
                        CUST_PHONECOUNTRYCODE: phnNoConstructor(userData.phnNo, userData.cCode).CUST_PHONECOUNTRYCODE,
                        CUST_PHONELOOKUP: phnNoConstructor(userData.phnNo, userData.cCode).CUST_PHONELOOKUP,
                        CUST_PHONENUMBER: phnNoConstructor(userData.phnNo, userData.cCode).CUST_PHONENUMBER,
                        CUST_PHONETYPE: 2,
                        PASSWORD: deCryptData(userData.password),
                        USERNAME: userData.email,
                        WCUST_FIRSTNAME: naemRes.firstName,
                        WCUST_IS_GUEST: false,
                        WCUST_LASTNAME: naemRes.lastName,
                        WCUST_STATUS: 4, //2 means : active but not verified /// 4 means verified
                    },
                    conceptID: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SDM.CONCEPT_ID,
                }
            }
            consolelog(process.cwd(), "data", JSON.stringify(data), false)

            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success")) {
                userData.password = deCryptData(userData.password);
                notificationService.sendNotification({
                    toSendEmail: true,
                    emailCode: Constant.NOTIFICATION_CODE.EMAIL.USER_WELCOME_EMAIL,
                    emailDestination: userData.email,
                    language: headers.language,
                    payload: JSON.stringify({ email: { user: userData, isNewUser: true } })
                });
                return res.RegisterCustomerResult
            }
            else {
                if (res.SDKResult && res.SDKResult.ResultText == "Customer is already exist") {
                    return await this.getCustomerByEmail({ email: userData.email }, headers)
                } else {
                    return Promise.reject(res)
                }
            }
        } catch (error) {
            consolelog(process.cwd(), 'createCustomerOnSdm', error, false)
            return (error)
        }
    }

    /**
    * @method SDK
    * */
    async updateCustomerOnSdm(userData: IUserRequest.IUserData, headers: ICommonRequest.IHeaders) {
        try {
            let naemRes = nameConstructor(userData.name.trim())
            let data: IUserSDMRequest.IUpdateUserReq = {
                name: "UpdateCustomer",
                req: {
                    licenseCode: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SDM.LICENSE_CODE,
                    language: headers.language.toLowerCase(),
                    customer: {
                        CUST_CLASSID: -1,
                        CUST_CORPID: userData.sdmCorpRef,
                        CUST_EMAIL: userData.email,
                        CUST_FIRSTNAME: naemRes.firstName,
                        CUST_ID: userData.sdmUserRef,
                        CUST_LASTNAME: naemRes.lastName,
                        CUST_NATID: -1,
                        CUST_NOTIFICATION_MOBILE: phnNoConstructor(userData.phnNo, userData.cCode).CUST_NOTIFICATION_MOBILE,
                        CUST_PHONEAREACODE: phnNoConstructor(userData.phnNo, userData.cCode).CUST_PHONEAREACODE,
                        CUST_PHONECOUNTRYCODE: phnNoConstructor(userData.phnNo, userData.cCode).CUST_PHONECOUNTRYCODE,
                        CUST_PHONELOOKUP: phnNoConstructor(userData.phnNo, userData.cCode).CUST_PHONELOOKUP,
                        CUST_PHONENUMBER: phnNoConstructor(userData.phnNo, userData.cCode).CUST_PHONENUMBER,
                        CUST_PHONETYPE: 2,
                        PASSWORD: deCryptData(userData.password),
                        USERNAME: userData.email,
                        WCUST_FIRSTNAME: naemRes.firstName,
                        WCUST_IS_GUEST: false,
                        WCUST_LASTNAME: naemRes.lastName,
                        WCUST_STATUS: 4, //2 means : active but not verified /// 4 means verified
                    }
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success")) {
                return res.UpdateCustomerResult
            }
            else
                return Promise.reject(res)
        } catch (error) {
            consolelog(process.cwd(), 'updateCustomerOnSdm', JSON.stringify(error), false)
            return (error)
        }
    }

    /**
    * @method SDK
    * */
    async updateCustomerTokenOnSdm(payload: IUserRequest.IUserData, headers: ICommonRequest.IHeaders) {
        try {
            let data: IUserSDMRequest.IUpdateCustomerTokenReq = {
                name: "UpdateCustomerToken",
                req: {
                    licenseCode: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SDM.LICENSE_CODE,
                    language: headers.language.toLowerCase(),
                    customerID: payload.sdmUserRef,
                    token: payload.socialKey
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success")) {
                return res.UpdateCustomerTokenResult
            }
            else
                return Promise.reject(res)
        } catch (error) {
            consolelog(process.cwd(), 'updateCustomerTokenOnSdm', JSON.stringify(error), false)
            return (error)
        }
    }

    /**
    * @method SDK
    * @param {string} email : customer email
    * */
    async getCustomerByEmail(payload, headers: ICommonRequest.IHeaders) {
        try {
            const data = {
                name: "GetCustomerByEmail",
                req: {
                    licenseCode: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SDM.LICENSE_CODE,
                    language: headers.language.toLowerCase(),
                    email: payload.email,
                    conceptID: Constant.CONF.COUNTRY_SPECIFIC[headers.country].SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success")) {
                return res.GetCustomerByEmailResult
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "getCustomerByEmail", error, false)
            return Promise.reject(error)
        }
    }
}

export const UserSDME = new UserSDMEntity()
