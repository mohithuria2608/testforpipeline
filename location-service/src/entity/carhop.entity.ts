'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { Aerospike } from '../aerospike'

export class CarHopEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []
    constructor() {
        super(Constant.SET_NAME.CARHOP)
    }

    async bootstrapCarHop(data) {
        try {
            if (data && data.length > 0) {
                let dataToSave = {
                    carHop: data
                }
                let putArg: IAerospike.Put = {
                    bins: dataToSave,
                    set: this.set,
                    key: "carHop",
                    create: true,
                }
                await Aerospike.put(putArg)
            }
            return {}
        } catch (error) {
            return {}
        }
    }
}

export const CarHopE = new CarHopEntity()
