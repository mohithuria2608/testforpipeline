'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class UpsellClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []
    // public upsellMenuId = 10;

    public productSchema = Joi.object().keys({
        id: Joi.number().required().description("pk")
    })

    public categorySchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        position: Joi.number().required(),
        name: Joi.string().required(),
        products: Joi.array().items(this.productSchema)
    })

    public menuSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        menuTempId: Joi.number().required(),
        conceptId: Joi.number().required(),
        menuId: Joi.number().required(),
        currency: Joi.string().required(),
        language: Joi.string().required(),
        updatedAt: Joi.number().required(),
        categories: Joi.array().items(this.categorySchema)
    })

    constructor() {
        super('upsell')
    }
    /**
    * @method INTERNAL
    * */
    async postUpsell(data) {
        try {
            console.log("----------> ", typeof data.menuId, data.menuId);
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.menuId,
                replace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "post upsell", error, false)
            return Promise.reject(error)
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
                key: payload.menuId
            }
            let menu = await Aerospike.get(getArg)
            if (menu && menu.menuId) {
                return menu.categories[0].products
            } else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getUpsellProducts", error, false)
            return Promise.reject(error)
        }
    }
}

export const UpsellE = new UpsellClass()
