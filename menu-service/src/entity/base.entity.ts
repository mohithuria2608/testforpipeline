import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }
}