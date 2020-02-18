'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService, kafkaService } from '../grpc/client'
import { consolelog } from '../utils'


export class MenuEntity extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.MENU)
    }

    /**
     * make it dynamic for menu id and sub menu Id
     */
    async fetchMenuFromSDM(payload) {
        try {

        } catch (error) {
            consolelog(process.cwd(), "fetchMenuFromSDM", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * formats menu for sync with aerospike 
     */
    async formatMenu(menuData) {
        return JSON.stringify(menuData).replace(/"not dependent"/g, "");
    }
}

export const MenuE = new MenuEntity()