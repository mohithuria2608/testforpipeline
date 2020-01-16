'use strict';
import { BaseEntity } from './base.entity'


export class LoggerClass extends BaseEntity {

    protected modelName: SetNames;
    constructor() {
        super('logger')
        this.modelName = 'logger'
    }
    
}

export const LoggerE = new LoggerClass()
