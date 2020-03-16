
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog, validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class NotificationServiceValidator {
    constructor() {
    }
    async notificationValidator(data: INotificationGrpcRequest.ISendNotification) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    toSendMsg: Joi.boolean(),
                    toSendEmail: Joi.boolean(),
                    msgCode: Joi.string(),
                    emailCode: Joi.string(),
                    msgDestination: Joi.string(),
                    emailDestination: Joi.string(),
                    language: Joi.string().valid(Constant.DATABASE.LANGUAGE.EN, Constant.DATABASE.LANGUAGE.AR)
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


