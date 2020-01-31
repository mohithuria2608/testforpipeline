
'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class LocationClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []

    constructor() {
        super('location')
    }
}

export const LocationE = new LocationClass()
