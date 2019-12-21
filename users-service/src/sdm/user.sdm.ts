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
    async createCustomer(payload: IUserSDMRequest.ICreateUser) {
        try {

            return {}
        } catch (error) {
            consolelog(process.cwd(), 'createCostomer', error, false)
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
            const data = {
                name: "GetCustomer",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
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
    async getCustomerByEmail(payload: IUserSDMRequest.IGetCustomerByEmail) {
        try {
            const data = {
                name: "GetCustomerByEmail",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
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
    async getCustomersByEmail(payload: IUserSDMRequest.IGetCustomerByEmail): Promise<number[]> {
        try {
            const data = {
                name: "GetCustomersByEmail",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
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
    async getCustomerById(payload: IUserSDMRequest.IGetCustomerByCustomerId) {
        try {
            const data = {
                name: "GetCustomerByID",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
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
    async getCustomerByMobile(payload: IUserSDMRequest.IGetCustomerByMobileNo) {
        try {
            const data = {
                name: "GetCustomerByMobile",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
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
    async getCustomersByPhone(payload: IUserSDMRequest.IGetCustomerByPhoneNo): Promise<number[]> {
        try {
            const data = {
                name: "GetCustomersByPhone",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
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

    /**
    * @method SDK
    * @param {number} phoneNo : customer PHONELOOKUP
    * @param {number} email : customer email
    * */
    async getsdmUserRef(payload: IUserSDMRequest.IGetCustomerSdmUserRef) {
        try {
            let sdmUserRefByPhoneNo = await this.getCustomersByPhone({ phoneNo: payload.phoneNo })
            let sdmUserRefByEmail = await this.getCustomersByEmail({ email: payload.email })
            let intersectionsdmUserRef = _.intersection(sdmUserRefByPhoneNo, sdmUserRefByEmail)
            consolelog(process.cwd(), "getsdmUserRef", JSON.stringify(intersectionsdmUserRef), false)
            return intersectionsdmUserRef
        } catch (error) {
            consolelog(process.cwd(), "getsdmUserRef", error, true)
            return Promise.reject(error)
        }
    }
}

export const UserSDME = new UserSDMEntity()
