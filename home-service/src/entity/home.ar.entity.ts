'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class HomeArClass extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.HOME_AR)
    }

    /**
     * @method BOOTSTRAP
     * */
    async postHome(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.countryId,
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
            let queryArg: IAerospike.Get = {
                key: payload.countryId,
                set: this.set,
            }
            let home = await Aerospike.get(queryArg)
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

export const HomeArE = new HomeArClass()