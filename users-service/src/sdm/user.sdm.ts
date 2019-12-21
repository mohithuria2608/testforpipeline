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
    * @param {string} customerUserName : customer email
    * @param {string} customerPassword : customer password
    * */
    async getCustomerByUserNameAndPswd(customerUserName, customerPassword) {
        try {
            const data = {
                name: "GetCustomer",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
                    customerUserName: customerUserName,
                    customerPassword: customerPassword,
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
    async getCustomerByEmail(email) {
        try {
            const data = {
                name: "GetCustomerByEmail",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
                    email: email,
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
    async getCustomersByEmail(email): Promise<number[]> {
        try {
            const data = {
                name: "GetCustomersByEmail",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
                    email: email,
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
    async getCustomerById(customerID) {
        try {
            const data = {
                name: "GetCustomerByID",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
                    customerID: customerID,
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
    async getCustomerByMobile(mobileNo) {
        try {
            const data = {
                name: "GetCustomerByMobile",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
                    mobileNo: mobileNo,
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
    async getCustomersByPhone(phoneNo): Promise<number[]> {
        try {
            const data = {
                name: "GetCustomersByPhone",
                req: {
                    licenseCode: "AmericanaWeb",
                    conceptID: 3,
                    requestID: 1,
                    language: "En",
                    phoneNo: phoneNo,
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
    async getSdmRefId(phoneNo: number, email: string) {
        try {
            let sdmRefIdByPhoneNo = await this.getCustomersByPhone(phoneNo)
            let sdmRefIdByEmail = await this.getCustomersByEmail(email)
            let intersectionSdmRefId = _.intersection(sdmRefIdByPhoneNo, sdmRefIdByEmail)
            consolelog(process.cwd(), "getSdmRefId", JSON.stringify(intersectionSdmRefId), false)
            return intersectionSdmRefId
        } catch (error) {
            consolelog(process.cwd(), "getSdmRefId", error, true)
            return Promise.reject(error)
        }
    }
}

export const UserSDME = new UserSDMEntity()
