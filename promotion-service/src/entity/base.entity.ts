import * as Constant from '../constant'
import { consolelog } from '../utils'
import { orderService } from '../grpc/client';

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }
    
}