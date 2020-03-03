
'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class HiddenClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []

    constructor() {
        super(Constant.SET_NAME.HIDDEN)
    }
}

export const HiddenE = new HiddenClass()
