'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'


export class PromotionEntity extends BaseEntity {
    constructor() {
        super('promotion')
    }
}

export const PromotionE = new PromotionEntity()