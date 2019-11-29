
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant/appConstants'

export class AuthServiceValidator {
    constructor() {
    }
    async  createTokenValidator(data: IAuthServiceRequest.ICreateTokenData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    deviceid: Joi.string().required(),
                    tokenType: Joi.string().valid(
                        Constant.DATABASE.TYPE.TOKEN.CMS_AUTH
                    ).required(),
                    devicetype: Joi.string().valid(
                        Constant.DATABASE.TYPE.DEVICE.WEB
                    ).required(),
                    id: Joi.string().optional(),
                    authCred: Joi.object().keys({
                        username: Joi.string(),
                        password: Joi.string()
                    })
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

    async verifyTokenValidator(data: IAuthServiceRequest.IVerifyTokenObj) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    token: Joi.string().required()
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


export const authServiceValidator = new AuthServiceValidator()


