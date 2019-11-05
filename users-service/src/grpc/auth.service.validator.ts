
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../utils"
import * as Constant from '../constant/appConstants'

export class AuthServiceValidator {
    constructor() {
    }
    async  createTokenValidator(data: IAuthServiceRequest.ICreateTokenData) {
        return new Promise((resolve, reject) => {
            try {
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
                resolve()
            } catch (error) {
                reject(error.message)
            }
        })
    }

    async verifyTokenValidator(data: IAuthServiceRequest.IVerifyTokenObj) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    token: Joi.string().required(),
                    tokenType: Joi.string().valid(
                        Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH,
                        Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH,
                    ).required(),
                });
                dataToValidate.validate(data, { abortEarly: true })
                resolve()
            } catch (error) {
                reject(error.message)
            }
        })
    }

}


export const authServiceValidator = new AuthServiceValidator()


