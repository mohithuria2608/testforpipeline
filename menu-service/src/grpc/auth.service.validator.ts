
'use strict';
import * as Joi from 'joi';
import { consolelog } from "../utils"
import * as Constant from '../constant/appConstants'

export class AuthServiceValidator {
    constructor() {
    }

    async verifyTokenValidator(data: IAuthServiceRequest.IVerifyTokenObj) {
        return new Promise((resolve, reject) => {
            let dataToValidate = Joi.object().keys({
                token: Joi.string().required(),
                tokenType: Joi.string().valid(
                    Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH
                ).required()
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


