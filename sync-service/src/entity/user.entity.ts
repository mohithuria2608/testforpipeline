'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class UserEntity extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.USER)
    }
}

export const UserE = new UserEntity()
