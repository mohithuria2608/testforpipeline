
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class OutletServiceValidator {
    constructor() {
    }
    async validateCoordinateValidator(data: IOutletServiceRequest.IValidateCoordinateData) {
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
}


export const outletServiceValidator = new OutletServiceValidator()


