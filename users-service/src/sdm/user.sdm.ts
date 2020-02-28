'use strict';
import * as config from "config"
import * as Constant from '../constant'
import { BaseSDM } from './base.sdm'
import { consolelog, nameConstructor } from '../utils'
import * as  _ from 'lodash';
import { kafkaService } from '../grpc/client'

export class UserSDMEntity extends BaseSDM {

    constructor() {
        super()
    }

    /**
    * @method SDK
    * */
    async createCustomerOnSdm(payload: IUserRequest.IUserData) {
        try {
            let naemRes = nameConstructor(payload.name)
            let data: IUserSDMRequest.ICreateUserReq = {
                name: "RegisterCustomer",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    customer: {
                        CUST_CLASSID: -1,
                        CUST_EMAIL: payload.email,
                        CUST_FIRSTNAME: naemRes.firstName,
                        CUST_LASTNAME: naemRes.lastName,
                        CUST_NATID: -1,
                        CUST_NOTIFICATION_MOBILE: (payload.cCode + payload.phnNo).replace('+', ''),
                        CUST_PHONEAREACODE: payload.cCode.replace('+', ''),//52
                        CUST_PHONELOOKUP: (payload.cCode + payload.phnNo).replace('+', ''),
                        CUST_PHONENUMBER: payload.phnNo,
                        CUST_PHONETYPE: 2,
                        PASSWORD: payload.password,
                        USERNAME: payload.email,
                        WCUST_FIRSTNAME: naemRes.firstName,
                        WCUST_IS_GUEST: false,
                        WCUST_LASTNAME: naemRes.lastName,
                        WCUST_STATUS: 4, //2 means : active but not verified /// 4 means verified
                    },
                    conceptID: Constant.SERVER.SDM.CONCEPT_ID,
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success")) {
                if (res.RegisterCustomerResult.CUST_CORPID == "0" || res.RegisterCustomerResult.CUST_CORPID == null)
                    kafkaService.kafkaSync({
                        set: Constant.SET_NAME.LOGGER,
                        mdb: {
                            create: true,
                            argv: JSON.stringify({
                                type: "LAG GAYI",
                                info: {
                                    request: {
                                        body: data
                                    },
                                    response: res.RegisterCustomerResult
                                },
                                description: data.name,
                                options: {
                                    env: Constant.SERVER.ENV[config.get("env")],
                                },
                                createdAt: new Date().getTime(),
                            })
                        },
                        inQ: true
                    })
                return res.RegisterCustomerResult
            }
            else
                return Promise.reject(res)
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
            let naemRes = nameConstructor(payload.name)
            let data: IUserSDMRequest.IUpdateUserReq = {
                name: "UpdateCustomer",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    customer: {
                        CUST_CLASSID: -1,
                        CUST_CORPID: payload.sdmCorpRef,
                        CUST_EMAIL: payload.email,
                        CUST_FIRSTNAME: naemRes.firstName,
                        CUST_ID: payload.sdmUserRef,
                        CUST_LASTNAME: naemRes.lastName,
                        CUST_NATID: -1,
                        CUST_NOTIFICATION_MOBILE: (payload.cCode + payload.phnNo).replace('+', ''),
                        CUST_PHONEAREACODE: payload.cCode.replace('+', ''),//52
                        CUST_PHONELOOKUP: (payload.cCode + payload.phnNo).replace('+', ''),
                        CUST_PHONENUMBER: payload.phnNo,
                        CUST_PHONETYPE: 2,
                        PASSWORD: payload.password,
                        USERNAME: payload.email,
                        WCUST_FIRSTNAME: naemRes.firstName,
                        WCUST_IS_GUEST: false,
                        WCUST_LASTNAME: naemRes.lastName,
                        WCUST_STATUS: 4, //2 means : active but not verified /// 4 means verified
                    }
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success")) {
                if (res.UpdateCustomerResult.CUST_CORPID == "0" || res.UpdateCustomerResult.CUST_CORPID == null)
                    kafkaService.kafkaSync({
                        set: Constant.SET_NAME.LOGGER,
                        mdb: {
                            create: true,
                            argv: JSON.stringify({
                                type: "LAG GAYI",
                                info: {
                                    request: {
                                        body: data
                                    },
                                    response: res.UpdateCustomerResult
                                },
                                description: data.name,
                                options: {
                                    env: Constant.SERVER.ENV[config.get("env")],
                                },
                                createdAt: new Date().getTime(),
                            })
                        },
                        inQ: true
                    })
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
    async updateCustomerTokenOnSdm(payload: IUserRequest.IUserData) {
        try {
            let data: IUserSDMRequest.IUpdateCustomerTokenReq = {
                name: "UpdateCustomerToken",
                req: {
                    licenseCode: Constant.SERVER.SDM.LICENSE_CODE,
                    language: "En",
                    customerID: payload.sdmUserRef,
                    token: payload.socialKey
                }
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success")) {
                if (res.UpdateCustomerTokenResult.CUST_CORPID == "0" || res.UpdateCustomerTokenResult.CUST_CORPID == null)
                    kafkaService.kafkaSync({
                        set: Constant.SET_NAME.LOGGER,
                        mdb: {
                            create: true,
                            argv: JSON.stringify({
                                type: "LAG GAYI",
                                info: {
                                    request: {
                                        body: data
                                    },
                                    response: res.UpdateCustomerTokenResult
                                },
                                description: data.name,
                                options: {
                                    env: Constant.SERVER.ENV[config.get("env")],
                                },
                                createdAt: new Date().getTime(),
                            })
                        },
                        inQ: true
                    })
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
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success")) {
                if (res.GetCustomerByEmailResult.CUST_CORPID == "0" || res.GetCustomerByEmailResult.CUST_CORPID == null)
                    kafkaService.kafkaSync({
                        set: Constant.SET_NAME.LOGGER,
                        mdb: {
                            create: true,
                            argv: JSON.stringify({
                                type: "LAG GAYI",
                                info: {
                                    request: {
                                        body: data
                                    },
                                    response: res.GetCustomerByEmailResult
                                },
                                description: data.name,
                                options: {
                                    env: Constant.SERVER.ENV[config.get("env")],
                                },
                                createdAt: new Date().getTime(),
                            })
                        },
                        inQ: true
                    })
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
