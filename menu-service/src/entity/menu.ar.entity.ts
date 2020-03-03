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
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'menu',
                    func: Constant.DATABASE.UDF.MENU.get_menu,
                    args: [payload.language],
                    forEach: true
                },
                equal: {
                    bin: "menuId",
                    value: payload.menuId
                },
                set: this.set,
                background: false,
            }
            let menu = await Aerospike.query(queryArg)
            if (menu && menu.length > 0) {
                return menu[0]
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.MENU_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getMenu", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const MenuArE = new MenuClass()
