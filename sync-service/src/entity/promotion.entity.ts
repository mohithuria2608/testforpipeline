'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'


export class PromotionEntity extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.PROMOTION)
    }
}

export const PromotionE = new PromotionEntity()