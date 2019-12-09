'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class MenuClass extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    protected set: SetNames;
    constructor() {
        super('menu')
    }

    async postMenu(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog("postMenu", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} id : user id
    * */
    async getById() {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: 1
            }
            let menu = await Aerospike.get(getArg)
            if (menu && menu.id) {
                return menu
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E404.MENU_NOT_FOUND)
        } catch (error) {
            consolelog("getById", error, false)
            return Promise.reject(error)
        }
    }
}

export const MenuE = new MenuClass()
