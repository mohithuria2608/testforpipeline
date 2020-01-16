'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class UserEntity extends BaseEntity {
    constructor() {
        super('user')
    }
}

export const UserE = new UserEntity()
