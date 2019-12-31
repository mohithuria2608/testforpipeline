'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'

export class MenuEntity extends BaseEntity {
    constructor() {
        super('menu')
    }

    async syncMenu(payload: ICMSMenuRequest.ICmsMenu) {
        try {
            return {}
        } catch (err) {
            consolelog(process.cwd(), "syncMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const MenuE = new MenuEntity()
