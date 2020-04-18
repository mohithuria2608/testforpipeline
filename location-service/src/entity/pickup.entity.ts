'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { Aerospike } from '../aerospike'

export class PickupEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []
    constructor() {
        super(Constant.SET_NAME.PICKUP)
    }

    async bootstrapPickup(data) {
        try {
            if (data && data.length > 0) {
                let dataToSave = {
                    pickup: data
                }
                let putArg: IAerospike.Put = {
                    bins: dataToSave,
                    set: this.set,
                    key: "pickup",
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

export const PickupE = new PickupEntity()
