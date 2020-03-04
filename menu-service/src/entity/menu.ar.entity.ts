'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class MenuClass extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.MENU_AR)
    }

    /**
     * @method BOOTSTRAP
     * */
    async postMenu(data) {
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
    * @param {string} id : user id
    * */
    async getMenu(payload: IMenuRequest.IFetchMenu) {
        try {
            let getArg: IAerospike.Get = {
                key: payload.menuId,
                set: this.set
            }
            let menu = await Aerospike.get(getArg)
            return menu
        } catch (error) {
            consolelog(process.cwd(), "getMenu ar", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const MenuArE = new MenuClass()
