'use strict';
import { BaseEntity } from './base.entity'


export class LoggerClass extends BaseEntity {

    constructor() {
        super('logger')
    }
    
}

export const LoggerE = new LoggerClass()
