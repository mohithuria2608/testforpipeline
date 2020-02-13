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
    async createCustomer(payload: IUserRequest.IUserData) {
        try {
            let data: IUserSDMRequest.ICreateUserReq = {
                name: "RegisterCustomer",
                req: {
                    licenseCode: "AmericanaWeb",
                    language: "En",
                    customer: {
                        CUST_CLASSID: -1,
                        CUST_EMAIL: payload.email,// "nkhan1000@mailinator.com",
                        CUST_FIRSTNAME: payload.name,// "nusrattest",
                        CUST_LASTNAME: payload.name,// "user",
                        CUST_NATID: -1,
                        CUST_NOTIFICATION_MOBILE: (payload.cCode + payload.phnNo).replace('+', ''),// 525454090,
                        CUST_PHONEAREACODE:payload.cCode.replace('+', ''),//52
                        CUST_PHONELOOKUP: (payload.cCode + payload.phnNo).replace('+', ''),// 525454090,
                        CUST_PHONENUMBER: payload.phnNo,// 5454090,
                        CUST_PHONETYPE: 2,
                        PASSWORD: payload.password,
                        USERNAME: payload.email,
                        WCUST_FIRSTNAME: payload.name,
                        WCUST_IS_GUEST: false,
                        WCUST_LASTNAME: payload.name,
                    },
                    conceptID: "3",
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), 'createCostomer', JSON.stringify(error), false)
            return (error)
        }
    }

    /**
    * @method SDK
    * */
    async updateCustomer(payload: IUserRequest.IUserData) {
        try {
            let data: IUserSDMRequest.IUpdateUserReq = {
                name: "UpdateCustomer",
                req: {
                    licenseCode: "AmericanaWeb",
                    language: "En",
                    conceptID: "3",
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), 'updateCustomer', JSON.stringify(error), false)
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
                    licenseCode: "AmericanaWeb",
                    language: "En",
                    customerUserName: payload.customerUserName,
                    customerPassword: payload.customerPassword,
                    conceptID: "3",
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
            // : IUserSDMRequest.IGetCustomerByEmailReq
            const data = {
                name: "GetCustomerByEmail",
                req: {
                    licenseCode: "AmericanaWeb",
                    language: "En",
                    email: payload.email,
                    conceptID: "3",
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
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
                    licenseCode: "AmericanaWeb",
                    language: "En",
                    email: payload.email,
                    conceptID: "3",
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
                    licenseCode: "AmericanaWeb",
                    language: "En",
                    customerID: payload.customerID,
                    conceptID: "3",
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
                    licenseCode: "AmericanaWeb",
                    language: "En",
                    mobileNo: payload.mobileNo,
                    conceptID: "3",
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
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
                    licenseCode: "AmericanaWeb",
                    language: "En",
                    phoneNo: payload.phoneNo,
                    conceptID: "3",
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
