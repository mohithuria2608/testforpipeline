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

    public configSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        type: Joi.string().required().valid("general", "payment").description("sk"),
    })


    /**
    * @method INTERNAL
    * @param {string} configId : config id
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
            } else if (payload.configId) {
                let getArg: IAerospike.Get = {
                    set: this.set,
                    key: payload.configId
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