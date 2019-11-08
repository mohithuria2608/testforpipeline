
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../utils"
import * as Constant from '../constant/appConstants'

export class AuthServiceValidator {
    constructor() {
    }

    async verifyTokenValidator(data: IAuthServiceRequest.IVerifyTokenObj) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    token: Joi.string().required(),
                    tokenType: Joi.string().valid(
                        Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH,
                    ).required(),
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


