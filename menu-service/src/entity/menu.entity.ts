'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class MenuClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []
    constructor() {
        super('menu')
    }

    async post(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.menuId,
                create: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(),"post menu", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} id : user id
    * */
    async getMenuById(id: number) {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: id
            }
            let menu = await Aerospike.get(getArg)
            if (menu && menu.id) {
                return menu
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.MENU_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(),"getById", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} country :current country of user
    * @param {boolean} isDefault :want to fetch default menu or not
    * */
    async grpcFetchMenu(payload: IMenuGrpcRequest.IFetchMenuData) {
        try {
            let menuId = 5;
            return await this.getMenuById(menuId)
        } catch (err) {
            consolelog(process.cwd(),"grpcFetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const MenuE = new MenuClass()
