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
                    customer: {
                        CUST_CLASSID: -1,
                        CUST_EMAIL: payload.email,// "nkhan1000@mailinator.com",
                        CUST_FIRSTNAME: payload.name,// "nusrattest",
                        CUST_LASTNAME: payload.name,// "user",
                        CUST_NATID: -1,
                        CUST_NOTIFICATION_MOBILE: parseInt((payload.cCode + payload.phnNo).replace('+', '')),// 525454090,
                        CUST_PHONEAREACODE: parseInt(payload.cCode.replace('+', '')),//52
                        CUST_PHONELOOKUP: parseInt((payload.cCode + payload.phnNo).replace('+', '')),// 525454090,
                        CUST_PHONENUMBER: parseInt(payload.phnNo),// 5454090,
                        CUST_PHONETYPE: 2,
                        PASSWORD: payload.password,
                        USERNAME: payload.email,
                        WCUST_FIRSTNAME: payload.name,
                        WCUST_IS_GUEST: false,
                        WCUST_LASTNAME: payload.name,
                    }
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), 'createCostomer', error, false)
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
                    customer: {
                    }
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), 'updateCustomer', error, false)
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
                    customerUserName: payload.customerUserName,
                    customerPassword: payload.customerPassword,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomerByUserNameAndPswd", error, true)
            return Promise.reject(error)
        }
    }

    /**
    * @method SDK
    * @param {string} email : customer email
    * */
    async getCustomerByEmail(payload) {
        try {
            const data: IUserSDMRequest.IGetCustomerByEmailReq = {
                name: "GetCustomerByEmail",
                req: {
                    email: payload.email,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomerByEmail", error, true)
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
                    email: payload.email,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomersByEmail", error, true)
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
                    customerID: payload.customerID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomerById", error, true)
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
                    mobileNo: payload.mobileNo,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomerByMobile", error, true)
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
                    phoneNo: payload.phoneNo,
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), "getCustomersByPhone", error, true)
            return Promise.reject(error)
        }
    }
}

export const UserSDME = new UserSDMEntity()
