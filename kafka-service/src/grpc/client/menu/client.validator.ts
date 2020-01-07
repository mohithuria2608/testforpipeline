
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class MenuServiceValidator {
    constructor() {
    }

    async syncOnCmsValidator(data: IMenuGrpcRequest.ISyncToCMSMenuData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    action: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        name: Joi.boolean(),
                        email: Joi.boolean(),
                        phone: Joi.boolean(),
                    }),
                    type: Joi.string(),
                    count: Joi.number().required(),
                    data: Joi.string().required()
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

    async updateMenuValidator(data: IMenuGrpcRequest.IUpdateMenuFromCMS) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    action: Joi.object().keys({
                        create: Joi.boolean(),
                        update: Joi.boolean(),
                        name: Joi.boolean(),
                        email: Joi.boolean(),
                        phone: Joi.boolean(),
                    }),
                    type: Joi.string(),
                    count: Joi.number().required(),
                    data: Joi.string().required()
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


export const menuServiceValidator = new MenuServiceValidator()


