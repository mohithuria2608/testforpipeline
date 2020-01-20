'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'


export class ConfigEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'type',
            index: 'idx_' + this.set + '_' + 'type',
            type: "STRING"
        }
    ]

    constructor() {
        super('config')
    }

    // {
    //     "store_code": "ksa_store",
    //     "store_id": "ksa_store",
    //     "noon_pay_config": {
    //       "brand_code": "ksa",
    //       "country_code": "us",
    //       "payment_methods": [
    //         {
    //           "id": "1",
    //           "name": "phla method",
    //           "order_category": "SC"
    //         },
    //         {
    //           "id": "3",
    //           "name": "Teesra  Method",
    //           "order_category": "General"
    //         }
    //       ],
    //       "code": "noonpay",
    //       "status": "1"
    //     },
    //     "cod_info": {
    //       "status": "1",
    //       "title": "Cash On Delivery",
    //       "code": "cashondelivery"
    //     },
    // "free_shipping": {
    //     "status": "1",
    //     "title": "Free Shipping",
    //     "min_order_total": null,
    //     "price": 0,
    //     "code": "freeshipping"
    //   },
    //   "flat_rate": {
    //     "status": "1",
    //     "title": "Flat Rate",
    //     "price": 5,
    //     "code": "freeshipping"
    //   }
    //   }

    public configSchema = Joi.object().keys({
        id: Joi.string().required().description("pk, storeCode_storeId"),
        type: Joi.string().required().valid("general", "payment", "shipment").description("sk"),
        storeCode: Joi.string().required(),
        storeId: Joi.number().required(),
        noonPayConfig: Joi.object().keys({
            brandCode: Joi.string().required(),
            countryCode: Joi.string().required(),
            paymentMethods: Joi.array().items(
                Joi.object().keys({
                    id: Joi.string().required(),
                    name: Joi.string().required(),
                    orderCategory: Joi.string().required(),
                })),
            code: Joi.string().required(),
            status: Joi.string().required(),
        }),
        codInfo: Joi.object().keys({
            code: Joi.string().required(),
            status: Joi.string().required(),
        }),
        free_shipping: Joi.object().keys({
            status: Joi.string().required(),
            title: Joi.string().required(),
            min_order_total: Joi.string().required(),
            price: Joi.number().required(),
            code: Joi.string().required(),
        }),
        flat_rate: Joi.object().keys({
            status: Joi.string().required(),
            title: Joi.string().required(),
            price: Joi.number().required(),
            code: Joi.string().required(),
        })
    })


    /**
    * @method INTERNAL
    * @param {string} cmsStoreRef : config id
    * @param {string} type : config type
    * */
    async getConfig(payload: IConfigRequest.IFetchConfig) {
        try {
            if (payload.type) {
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "type",
                        value: payload.type
                    },
                    set: this.set,
                    background: false,
                }
                let configData = await Aerospike.query(queryArg)
                if (configData && configData.length > 0) {
                    return configData[0]
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            } else if (payload.cmsStoreRef) {
                let getArg: IAerospike.Get = {
                    set: this.set,
                    key: payload.cmsStoreRef
                }
                let configData = await Aerospike.get(getArg)
                if (configData && configData.id) {
                    return configData
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            }
        } catch (error) {
            consolelog(process.cwd(), "getConfig", error, false)
            return Promise.reject(error)
        }
    }
}

export const ConfigE = new ConfigEntity()