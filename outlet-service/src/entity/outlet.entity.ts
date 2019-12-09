'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class OutletEntity extends BaseEntity {
    protected set: SetNames;
    constructor() {
        super('outlet')
    }

    async postOutlet(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog("postOutlet", error, false)
            return Promise.reject(error)
        }
    }

    async getOutletByStoreId(payload: IOutletRequest.IGetOutletStoreId) {
        try {
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "storeId",
                    value: parseInt(payload.storeId.toString())
                },
                set: this.set,
                background: false,
            }

            let outlet = await Aerospike.query(queryArg)
            console.log("outlet", JSON.stringify(outlet))
            if (outlet && outlet.id) {
                return [outlet]
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E404.STORE_NOT_FOUND)
        } catch (error) {
            consolelog("getOutletByStoreId", error, false)
            return Promise.reject(error)
        }
    }

}

export const OutletE = new OutletEntity()
