
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"

export class UserServiceValidator {
    constructor() {
    }
    async  fetchAddressById(data: IUserGrpcRequest.IFetchAddressById) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    userId: Joi.string().required(),
                    addressId: Joi.string().required()
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


