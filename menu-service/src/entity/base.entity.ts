import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    /**
    * @method GRPC
    * */
    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            /**
             * @data
             * @param {string} type  enum[menu, upsell]
             * @param {string} action enum[update , create]
             * @param {any} data
             */
            if (data.action == "update") {

            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncMenuFromKafka", error, false)
            return Promise.reject(error)
        }
    }
}