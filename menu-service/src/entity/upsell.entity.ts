'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class UpsellClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'menuId',
            index: 'idx_' + this.set + '_' + 'menuId',
            type: "NUMERIC"
        },
        {
            set: this.set,
            bin: 'language',
            index: 'idx_' + this.set + '_' + 'language',
            type: "STRING"
        }
    ]

    public productSchema = Joi.object().keys({
        id: Joi.number().required().description("pk")
    })

    public categorySchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        position: Joi.number().required(),
        name: Joi.string().required(),
        products: Joi.array().items(this.productSchema)
    })

    public upsellSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        menuTempId: Joi.number().required(),
        conceptId: Joi.number().required(),
        menuId: Joi.number().required().description("sk"),
        currency: Joi.string().required(),
        language: Joi.string().required().description("sk"),
        updatedAt: Joi.number().required(),
        categories: Joi.array().items(this.categorySchema)
    })

    constructor() {
        super('upsell')
    }
    /**
     * @method BOOTSTRAP
     * */
    async bootstrapUpsell(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            return {}
        }
    }

    /**
    * @method GRPC
    * @param {number=} menuId
    * */
    async getUpsellProducts(payload: IUpsellRequest.IFetchUpsell) {
        try {
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'upsell',
                    func: Constant.UDF.UPSELL.get_upsell,
                    args: [payload.language],
                    forEach: true
                },
                equal: {
                    bin: "menuId",
                    value: parseInt(payload.menuId.toString())
                },
                set: this.set,
                background: false,
            }
            let upsell = await Aerospike.query(queryArg)
            if (upsell && upsell.length > 0) {
                return upsell[0].categories[0].products
            } else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getUpsellProducts", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const UpsellE = new UpsellClass()
