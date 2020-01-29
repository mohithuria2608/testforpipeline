import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class LogController {

    constructor() { }

    async log(payload: ILogGrpcRequest.IKafkaBody) {
        try {
            consolelog(process.cwd(), 'JSON.parse(payload.mdb.argv)', payload.mdb.argv, false)
            let data: ICommonRequest.IActivityLogger = JSON.parse(payload.mdb.argv)
            ENTITY.LoggerE.createOneEntity(data)

            return {}
        } catch (error) {
            consolelog(process.cwd(), 'log', error, false)
            return Promise.reject(error)
        }
    }
}

export const logController = new LogController();