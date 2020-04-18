
'use strict';
import * as Joi from '@hapi/joi';
import { validatorErr} from "../../../utils"

export class UserServiceValidator {
    constructor() {
    }

    async fetchUser(data: IUserRequest.IFetchUser) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    userId: Joi.string().required()
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
}


export const userServiceValidator = new UserServiceValidator()


