'use strict';
import { BaseEntity } from './base.entity'

export class MenuClass extends BaseEntity {
    constructor() {
        super('Menu')
    }

}

export const MenuC = new MenuClass()
