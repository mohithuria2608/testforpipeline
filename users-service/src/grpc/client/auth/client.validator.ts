
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog, validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class AuthServiceValidator {
    constructor() {
    }
    async  createTokenValidator(data: IAuthGrpcRequest.ICreateTokenData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    deviceid: Joi.string().required(),
                    tokenType: Joi.string().valid(
                        Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH,
                        Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH,
                        Constant.DATABASE.TYPE.TOKEN.USER_AUTH,
                    ).required(),
                    devicetype: Joi.string().valid(
                        Constant.DATABASE.TYPE.DEVICE.ANDROID,
                        Constant.DATABASE.TYPE.DEVICE.IOS
                    ).required(),
                    id: Joi.string().optional(),
                    isGuest: Joi.boolean().valid(0, 1).required(),
                    sessionTime: Joi.number().required()
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

    async verifyTokenValidator(data: IAuthGrpcRequest.IVerifyTokenObj) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    token: Joi.string().required()
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


export const authServiceValidator = new AuthServiceValidator()


