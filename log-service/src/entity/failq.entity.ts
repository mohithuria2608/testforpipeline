'use strict';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'


export class FailQClass extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.FAILQ)
    }

}

export const FailQE = new FailQClass()
