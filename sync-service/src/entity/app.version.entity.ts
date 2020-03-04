'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'


export class AppversionEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'type',
            index: 'idx_' + this.set + '_' + 'type',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'deviceType',
            index: 'idx_' + this.set + '_' + 'deviceType',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'isActive',
            index: 'idx_' + this.set + '_' + 'isActive',
            type: "NUMERIC"
        }
    ]

    constructor() {
        super(Constant.SET_NAME.APP_VERSION)
    }

    public appversionSchema = Joi.object().keys({
        id: Joi.string().required().description("pk"),
        type: Joi.string().required().valid(
            Constant.DATABASE.TYPE.APP_VERSION.NORMAL,
            Constant.DATABASE.TYPE.APP_VERSION.SKIP,
            Constant.DATABASE.TYPE.APP_VERSION.FORCE,
        ).description("sk"),
        appversion: Joi.string().required(),
        deviceType: Joi.string().valid(
            Constant.DATABASE.TYPE.DEVICE.ANDROID,
            Constant.DATABASE.TYPE.DEVICE.IOS
        ),
        isActive: Joi.number().valid(0, 1).required(),
        createdAt: Joi.number(),
        updatedAt: Joi.number(),
    })

    /**
     * @method BOOTSTRAP
     * */
    async postAppversion(data) {
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
    * @param {string=} type : Appversion type
    * @param {number} isActive : status
    * @param {string=} deviceType 
    * */
    async getAppversion(payload: IAppversionRequest.IFetchAppversion) {
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
                let appversionData = await Aerospike.query(queryArg)
                if (appversionData && appversionData.length > 0) {
                    return appversionData.filter(obj => { return obj.isActive == 1 })
                } else
                    return []
            }
            else if (payload.deviceType && payload.deviceType != "") {
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "deviceType",
                        value: payload.deviceType
                    },
                    set: this.set,
                    background: false,
                }
                let appversionData = await Aerospike.query(queryArg)
                if (appversionData && appversionData.length > 0) {
                    return appversionData.filter(obj => { return obj.isActive == 1 })
                } else
                    return []
            } else {
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "isActive",
                        value: payload.isActive
                    },
                    set: this.set,
                    background: false,
                }
                let appversionData = await Aerospike.query(queryArg)
                if (appversionData && appversionData.length > 0) {
                    return appversionData
                } else
                    return []
            }
        } catch (error) {
            consolelog(process.cwd(), "getAppversion", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const AppversionE = new AppversionEntity()