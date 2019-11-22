'use strict';
import { BaseEntity } from './base.entity'

export class UserClass extends BaseEntity {
    constructor() {
        super('User')
    }

}

export const UserC = new UserClass()
