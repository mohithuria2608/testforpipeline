
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog, validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class MenuServiceValidator {
    constructor() {
    }
    async  fetchMenu(data: IMenuGrpcRequest.IFetchMenuReq) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    menuId: Joi.number(),
                    language: Joi.string().valid(
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LANGUAGE.message))
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

    async fetchHidden(data: IMenuGrpcRequest.IFetchHiddenReq) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    menuId: Joi.number(),
                    language: Joi.string().valid(
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LANGUAGE.message)),
                    type: Joi.string().valid(
                        Constant.DATABASE.TYPE.MENU.FREE,
                        Constant.DATABASE.TYPE.MENU.UPSELL,
                    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.DEFAULT_VALIDATION_ERROR.message)),
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


export const menuServiceValidator = new MenuServiceValidator()


