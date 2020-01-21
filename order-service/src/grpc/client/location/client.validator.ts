
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog,validatorErr } from "../../../utils"
import * as Constant from '../../../constant'

export class LocationServiceValidator {
    constructor() {
    }

    async fetchStoreValidator(data: IStoreGrpcRequest.IFetchStore) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    storeId: Joi.number().required()
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
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
                    lat: Joi.number().required(),
                    lng: Joi.number().required()
                })
                const { error, value } = dataToValidate.validate(data, { abortEarly: true })
                if (error)
                    reject(`Invalid Info- ${error.message}`)
                resolve({})
            } catch (error) {
                reject(validatorErr(error.message))
            }
        })
    }
}


export const locationServiceValidator = new LocationServiceValidator()


