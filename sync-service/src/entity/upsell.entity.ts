
'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class UpsellClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []

    constructor() {
        super(Constant.SET_NAME.UPSELL)
    }
}

export const UpsellE = new UpsellClass()
