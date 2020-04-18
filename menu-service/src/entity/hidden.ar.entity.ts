'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class HiddenArClass extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.HIDDEN_AR)
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
            consolelog(process.cwd(), "getHiddenProducts ar", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const HiddenArE = new HiddenArClass()
