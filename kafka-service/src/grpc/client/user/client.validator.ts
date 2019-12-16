
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class UserServiceValidator {
    constructor() {
    }
    async updateCmsIdValidator(data: IUserGrpcRequest.IUpdateUserInfo) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    aerospikeId: Joi.string().required(),
                    id: Joi.number().required()
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


export const userServiceValidator = new UserServiceValidator()


