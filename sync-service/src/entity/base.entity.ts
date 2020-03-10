import * as mongoose from "mongoose";
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseEntity {
    public ObjectId = mongoose.Types.ObjectId;
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

}