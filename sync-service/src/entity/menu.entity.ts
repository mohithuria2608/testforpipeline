'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService, kafkaService } from '../grpc/client'
import { consolelog } from '../utils'


export class MenuEntity extends BaseEntity {
    constructor() {
        super('menu')
    }

    /**
     * make it dynamic for menu id and sub menu Id
     */
    async fetchMenuFromSDM(payload: ICMSMenuRequest.ICmsMenu) {
        try {
            // return dummy menu json for now
            let data = JSON.stringify({ menuId: 1, products: [] });
            kafkaService.syncToCmsMenu({ action: { create: true }, data });
        } catch (err) {
            consolelog(process.cwd(), "syncMenu", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * make it dynamic for menu id and sub menu Id
     */
    async fetchMenuFromCMS(payload: ICMSMenuRequest.ICmsMenu) {
        try {
            kafkaService.updateMenuFromCMS({ action: { create: true }, data: JSON.stringify(payload) });
        } catch (err) {
            consolelog(process.cwd(), "fetchMenuFromCMS", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * syncs upsell products from cms into aerospike
     */
    async syncUpsellProducts(payload: ICMSMenuRequest.ICmsMenu) {
        try {
            kafkaService.syncUpsellProducts({ action: { create: true }, data: JSON.stringify(payload) });
        } catch (err) {
            consolelog(process.cwd(), "fetchMenuFromCMS", err, false)
            return Promise.reject(err)
        }
    }
}

export const MenuE = new MenuEntity()