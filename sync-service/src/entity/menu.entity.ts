'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService, kafkaService } from '../grpc/client'
import { consolelog } from '../utils'
import { startMenuSyncSequence } from "../service";


export class MenuEntity extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.MENU_EN)
    }

    /**
     * make it dynamic for menu id and sub menu Id
     */
    async fetchMenuFromSDM(payload: ISdmMenuRequest.ISdmMenu) {
        try {
            await startMenuSyncSequence(payload.menuId)
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