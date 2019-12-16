'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'

export class SyncMenuEntity extends BaseEntity {
    constructor() {
        super('Menu')
    }

    async syncMenu() {
        try {
            return {}
        } catch (err) {
            consolelog(process.cwd(),"syncMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const SyncMenuE = new SyncMenuEntity()
