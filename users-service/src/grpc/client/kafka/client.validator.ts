
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class KafkaServiceValidator {
    constructor() {
    }

    async syncToSdmUserValidator(data: IKafkaGrpcRequest.ISyncToSDMUserData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({

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

    async syncToCmsUserValidator(data: IKafkaGrpcRequest.ISyncToCMSUserData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    action: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        name: Joi.boolean(),
                        email: Joi.boolean(),
                        phone: Joi.boolean(),
                    }),
                    aerospikeId: Joi.string().required(),
                    lastname: Joi.string().required(),
                    firstname: Joi.string().required(),
                    email: Joi.string().required(),
                    storeId: Joi.number().required().valid(1, 3).description('UAE'),
                    websiteId: Joi.number().required().valid(1, 3).description('UAE'),
                    password: Joi.string().required()
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
}


export const kafkaServiceValidator = new KafkaServiceValidator()


