'use strict';
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class AreaEntity extends BaseEntity {
    protected set: SetNames;
    constructor() {
        super('area')
    }

    async postArea(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog("postArea", error, false)
            return Promise.reject(error)
        }
    }

    // async getAreaByStoreId(data: IAreaGrpcRequest.IGetAreaByStoreIdData) {
    //     try {
    //         let queryArg: IAerospike.Query = {
    //             equal: {
    //                 bin: "storeId",
    //                 value: data.storeId
    //             },
    //             set: this.set,
    //             background: false,
    //         }
    //         let area: IAreaRequest.IArea = await Aerospike.query(queryArg)
    //         return area[0]
    //     } catch (error) {
    //         consolelog("getAreaByStoreId", error, false)
    //         return Promise.reject(error)
    //     }
    // }
}

export const AreaE = new AreaEntity()
