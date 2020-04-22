
'use strict';
import * as Joi from '@hapi/joi';
import { validatorErr } from "../../../utils"
import * as Constant from "../../../constant";
export class LocationServiceValidator {
    constructor() {
    }

    async fetchStoreValidator(data: IStoreGrpcRequest.IFetchStore) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    storeId: Joi.number().required(),
                    language: Joi.string().valid(
                        Constant.DATABASE.LANGUAGE.AR,
                        Constant.DATABASE.LANGUAGE.EN
                    ).default(Constant.DATABASE.LANGUAGE.EN).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LANGUAGE.message)),
                    serviceType: Joi.string().valid(
                        Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY,
                        Constant.DATABASE.TYPE.STORE_SERVICE.TAKEAWAY,
                        Constant.DATABASE.TYPE.STORE_SERVICE.DINEIN,
                        Constant.DATABASE.TYPE.STORE_SERVICE.CARHOP
                    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
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

    async validateCoordinateValidator(data: IStoreGrpcRequest.IValidateCoordinateData) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    lat: Joi.number().unsafe().min(-90).max(90).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
                    lng: Joi.number().unsafe().min(-180).max(180).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
                    serviceType: Joi.string().valid(
                        Constant.DATABASE.TYPE.STORE_SERVICE.DELIVERY,
                        Constant.DATABASE.TYPE.STORE_SERVICE.TAKEAWAY,
                        Constant.DATABASE.TYPE.STORE_SERVICE.DINEIN,
                        Constant.DATABASE.TYPE.STORE_SERVICE.CARHOP
                    ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LOCATION.message)),
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


export const locationServiceValidator = new LocationServiceValidator()


