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
        id: Joi.number().required(),
        menuTempId: Joi.number().required(),
        conceptId: Joi.number().required(),
        menuId: Joi.number().required().description("pk"),
        currency: Joi.string().required(),
        language: Joi.string().required(),
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
                key: data.menuId,
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
            let getArg: IAerospike.Get = {
                set: this.set,
                key: parseInt(payload.menuId.toString())
            }
            let upsell = await Aerospike.get(getArg)
            if (upsell && upsell.menuId) {
                return upsell.categories[0].products
            } else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getUpsellProducts", error, false)
            return Promise.reject(error)
        }
    }
}

export const UpsellE = new UpsellClass()
