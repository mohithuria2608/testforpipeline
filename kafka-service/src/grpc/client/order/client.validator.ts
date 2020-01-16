
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class OrderServiceValidator {
    constructor() {
    }

    async syncValidator(data: IKafkaRequest.IKafkaBody) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    set: Joi.string().required(),
                    as: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    cms: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    sdm: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        argv: Joi.string()
                    }),
                    count: Joi.number().required()
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
                resolve({})
            } catch (error) {
                reject(error.message)
            }
        })
    }
    
    // async createSdmOrderValidator(data: IOrderGrpcRequest.ICreateSdmOrder) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             let dataToValidate = Joi.object().keys({
    //             })
    //             const { error, value } = dataToValidate.validate(data, { abortEarly: true })
    //             if (error)
    //                 reject(`Invalid Info- ${error.message}`)
    //             resolve({})
    //         } catch (error) {
    //             reject(error.message)
    //         }
    //     })
    // }

    // async getSdmOrderValidator(data: IOrderGrpcRequest.IGetSdmOrder) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             let dataToValidate = Joi.object().keys({
    //                 cartId: Joi.string().required(),
    //                 sdmOrderRef: Joi.number().required(),
    //                 status: Joi.string().required(),
    //                 timeInterval: Joi.number().required(),
    //             })
    //             const { error, value } = dataToValidate.validate(data, { abortEarly: true })
    //             if (error)
    //                 reject(`Invalid Info- ${error.message}`)
    //             resolve({})
    //         } catch (error) {
    //             reject(error.message)
    //         }
    //     })
    // }
}


export const orderServiceValidator = new OrderServiceValidator()


