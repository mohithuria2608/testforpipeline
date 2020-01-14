
'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class UpsellClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []

    constructor() {
        super('upsell')
    }
}

export const UpsellE = new UpsellClass()
