'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseSDM } from './base.sdm'
import { consolelog } from '../utils'
import * as  _ from 'lodash';

export class UserSDMEntity extends BaseSDM {

    constructor() {
        super()
    }

    /**
    * @method SDK
    * */
    async createCustomerOnSdm(payload: IUserRequest.IUserData) {
        try {
            let data: IUserSDMRequest.ICreateUserReq = {
                name: "RegisterCustomer",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    customer: {
                        CUST_CLASSID: -1,
                        CUST_EMAIL: payload.email,
                        CUST_FIRSTNAME: payload.name,
                        CUST_LASTNAME: payload.name,
                        CUST_NATID: -1,
                        CUST_NOTIFICATION_MOBILE: (payload.cCode + payload.phnNo).replace('+', ''),
                        CUST_PHONEAREACODE: payload.cCode.replace('+', ''),//52
                        CUST_PHONELOOKUP: (payload.cCode + payload.phnNo).replace('+', ''),
                        CUST_PHONENUMBER: payload.phnNo,
                        CUST_PHONETYPE: 2,
                        PASSWORD: payload.password,
                        USERNAME: payload.email,
                        WCUST_FIRSTNAME: payload.name,
                        WCUST_IS_GUEST: false,
                        WCUST_LASTNAME: payload.name,
                        WCUST_STATUS: 4, //2 means : active but not verified /// 4 means verified
                    },
                    conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.RegisterCustomerResult
            else
                return Promise.reject(JSON.stringify(res))
        } catch (error) {
            consolelog(process.cwd(), 'createCustomerOnSdm', error, false)
            return (error)
        }
    }

    /**
    * @method SDK
    * */
    async updateCustomerOnSdm(payload: IUserRequest.IUserData) {
        try {
            let data: IUserSDMRequest.IUpdateUserReq = {
                name: "UpdateCustomer",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    customer: {
                        CUST_CLASSID: -1,
                        CUST_EMAIL: payload.email,
                        CUST_FIRSTNAME: payload.name,
                        CUST_ID: payload.sdmUserRef,
                        CUST_LASTNAME: payload.name,
                        CUST_NATID: -1,
                        CUST_NOTIFICATION_MOBILE: (payload.cCode + payload.phnNo).replace('+', ''),
                        CUST_PHONEAREACODE: payload.cCode.replace('+', ''),//52
                        CUST_PHONELOOKUP: (payload.cCode + payload.phnNo).replace('+', ''),
                        CUST_PHONENUMBER: payload.phnNo,
                        CUST_PHONETYPE: 2,
                        PASSWORD: payload.password,
                        USERNAME: payload.email,
                        WCUST_FIRSTNAME: payload.name,
                        WCUST_IS_GUEST: false,
                        WCUST_LASTNAME: payload.name,
                        WCUST_STATUS: 4, //2 means : active but not verified /// 4 means verified
                    }
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.UpdateCustomerResult
            else
                return Promise.reject(res)
        } catch (error) {
            consolelog(process.cwd(), 'updateCustomerOnSdm', JSON.stringify(error), false)
            return (error)
        }
    }

    /**
    * @method SDK
    * @param {string} customerUserName : customer email
    * @param {string} customerPassword : customer password
    * */
    async getCustomerByUserNameAndPswd(payload: IUserSDMRequest.IGetCustomerByUserNameAndPswd) {
        try {
            const data: IUserSDMRequest.IGetCustomerByUserNameAndPswdReq = {
                name: "GetCustomer",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    customerUserName: payload.customerUserName,
                    customerPassword: payload.customerPassword,
                    conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomerByUserNameAndPswd", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDK
    * @param {string} email : customer email
    * */
    async getCustomerByEmail(payload) {
        try {
            const data = {
                name: "GetCustomerByEmail",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    email: payload.email,
                    conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.GetCustomerByEmailResult
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "getCustomerByEmail", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDK
    * @param {string} email : customer email
    * */
    async getCustomersByEmail(payload): Promise<number[]> {
        try {
            const data: IUserSDMRequest.IGetCustomerByEmailReq = {
                name: "GetCustomersByEmail",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    email: payload.email,
                    conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomersByEmail", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDK
    * @param {number} customerID : sdm customer id
    * */
    async getCustomerById(payload) {
        try {
            const data: IUserSDMRequest.IGetCustomerByCustomerIdReq = {
                name: "GetCustomerByID",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    customerID: payload.customerID,
                    conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomerById", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDK
    * @param {number} mobileNo : customer PHONELOOKUP
    * */
    async getCustomerByMobile(payload) {
        try {
            const data: IUserSDMRequest.IGetCustomerByMobileNoReq = {
                name: "GetCustomerByMobile",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    mobileNo: payload.mobileNo,
                    conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.GetCustomerByMobileResult
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "getCustomerByMobile", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDK
    * @param {number} phoneNo : customer PHONELOOKUP
    * */
    async getCustomersByPhone(payload): Promise<number[]> {
        try {
            const data: IUserSDMRequest.IGetCustomerByPhoneNoReq = {
                name: "GetCustomersByPhone",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    phoneNo: payload.phoneNo,
                    conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomersByPhone", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const UserSDME = new UserSDMEntity()
