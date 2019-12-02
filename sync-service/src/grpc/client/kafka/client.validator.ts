
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class KafkaServiceValidator {
    constructor() {
    }
    async  produceMessageValidator(data: IKafkaServiceRequest.IProduceMessage) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    data: Joi.any()
                });
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


