'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class HiddenEnClass extends BaseEntity {

    public productSchema = Joi.object().keys({
        id: Joi.number().required().description("pk")
    })

    public categorySchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        position: Joi.number().required(),
        name: Joi.string().trim().required(),
        products: Joi.array().items(this.productSchema)
    })

    public hiddenSchema = Joi.object().keys({
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
        super(Constant.SET_NAME.HIDDEN_EN)
    }
    /**
     * @method BOOTSTRAP
     * */
    async bootstrapHidden(data) {
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
     * @method BOOTSTRAP
     * */
    async postHiddenMenu(data) {
        try {
            console.log("data------------------------", data)
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.menuId,
                createOrReplace: true,
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
    async getHiddenProducts(payload: IHiddenRequest.IFetchHidden) {
        try {
            let getArg: IAerospike.Get = {
                key: parseInt(payload.menuId.toString()),
                set: this.set
            }
            let hidden = await Aerospike.get(getArg)
            if (hidden && hidden.categories)
                return hidden.categories
            else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getHiddenProducts en", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const HiddenEnE = new HiddenEnClass()
