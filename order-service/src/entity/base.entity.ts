import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseEntity {
    protected set: SetNames;
    constructor(set?) {
        this.set = set
    }

}