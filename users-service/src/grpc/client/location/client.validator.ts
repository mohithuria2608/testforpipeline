
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class LocationServiceValidator {
    constructor() {
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
                reject(error.message)
            }
        })
    }

    async getAreaByStoreIdValidator(data: IAreaGrpcRequest.IGetAreaByStoreIdData) {
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
                reject(error.message)
            }
        })
    }
}


export const locationServiceValidator = new LocationServiceValidator()


