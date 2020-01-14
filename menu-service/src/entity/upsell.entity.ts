'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class UpsellClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []
    public upsellMenuId = 10;

    constructor() {
        super('upsell')
    }

    async post(data) {
        try {
            console.log("----------> ", typeof data.menuId, data.menuId);
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.menuId,
                replace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "post upsell", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * */
    async getUpsellProducts() {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: this.upsellMenuId
            }
            let menu = await Aerospike.get(getArg)
            if (menu && menu.menuId) {
                return menu.products
            } else
                return []
        } catch (error) {
            consolelog(process.cwd(), "getUpsellProducts", error, false)
            return Promise.reject(error)
        }
    }

    // /**
    //  * @method GRPC
    //  * @param {string} data :data of the menu
    //  */
    // async upsellProductsSync(payload: IMenuGrpcRequest.IUpsellProductsSync) {
    //     let parsedPayload = JSON.parse(payload.data);
    //     return this.post(parsedPayload.data);
    // }
}

export const UpsellE = new UpsellClass()
