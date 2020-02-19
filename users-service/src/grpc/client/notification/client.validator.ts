
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog, validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class NotificationServiceValidator {
    constructor() {
    }
    async smsValidator(data: INotificationGrpcRequest.ISendSms) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    message: Joi.string().required(),
                    destination: Joi.string().required(),
                    type: Joi.number().required(),
                    dlr: Joi.number().required(),
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


export const notificationServiceValidator = new NotificationServiceValidator()


