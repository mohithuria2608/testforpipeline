'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class HomeClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'language',
            index: 'idx_' + this.set + '_' + 'language',
            type: "STRING"
        }
    ]
    constructor() {
        super(Constant.SET_NAME.HOME)
    }

    public homeSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        language: Joi.string().required().description("sk"),
    })

    /**
     * @method BOOTSTRAP
     * */
    async postHome(data) {
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
    * @param {string} id : user id
    * */
    async getHome(payload: IHomeRequest.IFetchHome) {
        try {
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "language",
                    value: payload.language
                },
                set: this.set,
                background: false,
            }
            let home = await Aerospike.query(queryArg)
            if (home && home.length > 0) {
                return home
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.HOME_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getHome", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const HomeE = new HomeClass()
