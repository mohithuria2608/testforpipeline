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
        },
        {
            set: this.set,
            bin: 'store_code',
            index: 'idx_' + this.set + '_' + 'store_code',
            type: "STRING"
        }
    ]

    constructor() {
        super(Constant.SET_NAME.CONFIG)
    }

    /**
     * @method BOOTSTRAP
     * */
    async postConfiguration(data) {
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
    * @param {string=} store_code : store code
    * @param {string=} type : config type
    * */
    async getConfig(payload: IConfigRequest.IFetchConfig) {
        try {
            if (payload.type && payload.type != "") {
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
                    return configData
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            }
            if (payload.store_code && payload.store_code != "") {
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "store_code",
                        value: payload.store_code
                    },
                    set: this.set,
                    background: false,
                }
                let configData = await Aerospike.query(queryArg)
                if (configData && configData.length > 0) {
                    return configData
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.CONFIG_NOT_FOUND)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "getConfig", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const ConfigE = new ConfigEntity()