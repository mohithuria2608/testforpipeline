
'use strict';
import * as Joi from '@hapi/joi';
import { validatorErr} from "../../../utils"

export class AuthServiceValidator {
    constructor() {
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


