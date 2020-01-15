
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"

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
                    reject(`Invalid Info- ${error.message}`)
                resolve({})
            } catch (error) {
                reject(error.message)
            }
        })
    }
}


export const userServiceValidator = new UserServiceValidator()


