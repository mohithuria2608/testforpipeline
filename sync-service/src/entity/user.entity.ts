'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'

export class UserEntity extends BaseEntity {
    constructor() {
        super('user')
    }

    async syncUser(payload: ICMSUserRequest.ICmsUser) {
        try {
            return {}
        } catch (err) {
            consolelog(process.cwd(), "syncUser", err, false)
            return Promise.reject(err)
        }
    }
}

export const UserE = new UserEntity()
