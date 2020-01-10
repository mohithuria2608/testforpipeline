import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { consolelog } from '../utils'
import {  } from '../grpc/client'

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

}