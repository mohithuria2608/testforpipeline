'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class HiddenEnClass extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.HIDDEN_EN)
    }
    /**
     * @method BOOTSTRAP
     * */
    async bootstrapHidden(data) {
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
     * @method BOOTSTRAP
     * */
    async postHiddenMenu(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.menuId,
                createOrReplace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            return {}
        }
    }

    /**
    * @method GRPC
    * @param {number=} menuId
    * */
    async getHiddenProducts(payload: IHiddenRequest.IFetchHidden) {
        try {
            let getArg: IAerospike.Get = {
                key: parseInt(payload.menuId.toString()),
                set: this.set
            }
            let hidden = await Aerospike.get(getArg)
            if (hidden && hidden.categories)
                return hidden.categories
            else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getHiddenProducts en", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const HiddenEnE = new HiddenEnClass()
