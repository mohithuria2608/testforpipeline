
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../utils"
import * as Constant from '../constant/appConstants'

export class AuthServiceValidator {
    constructor() {
    }
    async  createTokenValidator(data: IAuthServiceRequest.ICreateTokenData) {
        return new Promise((resolve, reject) => {
            let dataToValidate = Joi.object().keys({
                deviceId: Joi.string().required(),
                tokenType: Joi.string().valid(
                    Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH,
                    Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH,
                ).required(),
                devicetype: Joi.string().valid(
                    Constant.DATABASE.TYPE.DEVICE.ANDROID,
                    Constant.DATABASE.TYPE.DEVICE.IOS
                ).required(),
                id: Joi.string().optional(),
            });
            dataToValidate.validate(data, { abortEarly: true })
                .then(validate => {
                    resolve({})
                })
                .catch(validationError => {
                    consolelog('createTokenValidator', validationError, false)
                    reject(validationError.message)
                });
        })
    }

    async verifyTokenValidator(data: IAuthServiceRequest.IVerifyTokenObj) {
        return new Promise((resolve, reject) => {
            let dataToValidate = Joi.object().keys({
                token: Joi.string().required(),
                tokenType: Joi.string().valid(
                    Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH,
                    Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH,
                ).required(),
            });
            dataToValidate.validate(data, { abortEarly: true })
                .then(validate => {
                    resolve({})
                })
                .catch(validationError => {
                    consolelog('verifyTokenValidator', validationError, false)
                    reject(validationError.message)
                });
        })
    }

}


export const authServiceValidator = new AuthServiceValidator()


