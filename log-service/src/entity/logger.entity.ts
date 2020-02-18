'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'


export class LoggerClass extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.LOGGER)
    }

}

export const LoggerE = new LoggerClass()
