'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'


export class LoadClass extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.LOAD)
    }
}

export const LoadE = new LoadClass()
