
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class UserServiceValidator {
    constructor() {
    }

    async fetchUserValidator(data: IUserRequest.IFetchUser) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    userId: Joi.string(),
                    cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE),
                    phnNo: Joi.string().max(9),
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

    async  fetchAddressValidator(data: IUserGrpcRequest.IFetchAddress) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    userId: Joi.string().required(),
                    addressId: Joi.string().required(),
                    bin: Joi.string().valid("delivery", "pickup").required(),
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


