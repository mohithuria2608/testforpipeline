import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class LogController {

    constructor() { }

    async log(payload: ILogGrpcRequest.IKafkaBody) {
        try {
            consolelog(process.cwd(), 'JSON.parse(payload.mdb.argv)', payload.mdb.argv, false)
            let data: ICommonRequest.IActivityLogger = JSON.parse(payload.mdb.argv)

            switch (data['type']) {
                case Constant.DATABASE.TYPE.ACTIVITY_LOG.REQUEST,
                    Constant.DATABASE.TYPE.ACTIVITY_LOG.SDM_REQUEST,
                    Constant.DATABASE.TYPE.ACTIVITY_LOG.INFO,
                    Constant.DATABASE.TYPE.ACTIVITY_LOG.ERROR: {
                        ENTITY.LoggerE.createOneEntity(data)
                        break;
                    }
                case Constant.DATABASE.TYPE.ACTIVITY_LOG.FAIL_Q: {
                    ENTITY.FailQE.createOneEntity(data)
                    break;
                }
            }


            return {}
        } catch (error) {
            consolelog(process.cwd(), 'log', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const logController = new LogController();