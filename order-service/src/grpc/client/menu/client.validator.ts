
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"

export class MenuServiceValidator {
    constructor() {
    }
    async  fetchMenu(data: IMenuGrpcRequest.IFetchMenuData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    menuId: Joi.number(),
                    country: Joi.string().required(),
                    isDefault: Joi.boolean().valid(true, false)
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


export const menuServiceValidator = new MenuServiceValidator()


