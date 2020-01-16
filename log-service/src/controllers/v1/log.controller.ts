import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class LogController {

    constructor() { }

    async log(payload: ILogGrpcRequest.IKafkaBody) {
        try {

        } catch (error) {
            consolelog(process.cwd(), 'log', error, false)
            return Promise.reject(error)
        }
    }
}

export const logController = new LogController();