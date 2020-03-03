'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class HiddenClass extends BaseEntity {
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
        super(Constant.SET_NAME.HIDDEN)
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
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'hidden',
                    func: Constant.DATABASE.UDF.HIDDEN.get_hidden,
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
            let hidden = await Aerospike.query(queryArg)
            if (hidden && hidden.length > 0) {
                return hidden[0].categories[0].products
            } else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getHiddenProducts", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const HiddenE = new HiddenClass()
