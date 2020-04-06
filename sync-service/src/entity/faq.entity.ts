'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog, generateFaqId } from '../utils'
import { Aerospike } from '../aerospike'


export class FaqEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'language',
            index: 'idx_' + this.set + '_' + 'language',
            type: "STRING"
        }
    ]

    constructor() {
        super(Constant.SET_NAME.FAQ)
    }

    public faqSchema = Joi.object().keys({
        id: Joi.string().required().description("pk"),
        language: Joi.string().required().valid(
            Constant.DATABASE.LANGUAGE.AR,
            Constant.DATABASE.LANGUAGE.EN
        ).default(Constant.DATABASE.LANGUAGE.EN).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_LANGUAGE.type)),
        country: Joi.string().valid(
            Constant.DATABASE.COUNTRY.UAE
        ).required().error(new Error(Constant.STATUS_MSG.ERROR.E422.INVALID_COUNTRY.type)),
        questionair: Joi.array().items(
            Joi.object().keys({
                ques: Joi.string(),
                ans: Joi.string()
            }))
    })

    /**
     * @method BOOTSTRAP
     * */
    async postFaq(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                createOrReplace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            return {}
        }
    }

    /**
    * @method INTERNAL
    * @param {string} language : language
    * @param {string} country : country
    * */
    async getFaq(payload: IFaqRequest.IFetchFaq) {
        try {
            let getArg: IAerospike.Get = {
                key: generateFaqId(payload.country, payload.language),
                set: this.set,
            }
            let faqData = await Aerospike.get(getArg)
            if (faqData && faqData.id)
                return faqData
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "getFaq", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const FaqE = new FaqEntity()