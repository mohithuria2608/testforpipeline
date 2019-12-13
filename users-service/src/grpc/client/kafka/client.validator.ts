
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class KafkaServiceValidator {
    constructor() {
    }
    async createUserValidator(data: IKafkaGrpcRequest.ICreateUserData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    lastname: Joi.string().required(),
                    firstname: Joi.string().required(),
                    email: Joi.string().required(),
                    storeId: Joi.string().required().valid(3).description('UAE'),
                    websiteId: Joi.string().required().valid(3).description('UAE'),
                    addresses: Joi.array()
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


