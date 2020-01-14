
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog } from "../../../utils"
import * as Constant from '../../../constant'

export class PromotionServiceValidator {
    constructor() {
    }

    async validateCouponValidator(data: IPromotionGrpcRequest.IGetPromotion) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    couponCode: Joi.string().optional(),
                    cmsCouponRef: Joi.string().optional()
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


export const promotionServiceValidator = new PromotionServiceValidator()


