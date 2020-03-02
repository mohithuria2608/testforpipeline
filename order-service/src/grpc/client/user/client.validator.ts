
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog, validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class UserServiceValidator {
    constructor() {
    }

    async fetchUserValidator(data: IUserRequest.IFetchUser) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    userId: Joi.string(),
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE),
                    phnNo: Joi.string().min(9).max(9),
                    cartId: Joi.string()
                });
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(error.message)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }

    async  fetchAddressValidator(data: IUserGrpcRequest.IFetchAddress) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    userId: Joi.string().required(),
                    addressId: Joi.string().required(),
                    bin: Joi.string().valid(Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY, Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP).required(),
                });
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(error.message)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }

    async syncValidator(data: IKafkaGrpcRequest.IKafkaBody) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    set: Joi.string().required(),
                    as: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        sync: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    cms: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        sync: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    sdm: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        sync: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    mdb: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        reset: Joi.boolean(),
                        get: Joi.boolean(),
                        sync: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    count: Joi.number(),
                    q: Joi.string(),
                    error: Joi.string().allow(""),
                    inQ: Joi.boolean().required()
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(error.message)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }
}


export const userServiceValidator = new UserServiceValidator()


