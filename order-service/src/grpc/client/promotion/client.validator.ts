
'use strict';
import * as Joi from '@hapi/joi';
import { consolelog,validatorErr} from "../../../utils"
import * as Constant from '../../../constant'

export class PromotionServiceValidator {
    constructor() {
    }

    async validateCouponValidator(data: IPromotionGrpcRequest.IValidatePromotion) {
        return new Promise((resolve, reject) => {
            try {
                let dataToValidate = Joi.object().keys({
                    couponCode: Joi.string().required(),
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


export const promotionServiceValidator = new PromotionServiceValidator()


