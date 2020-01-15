import * as Constant from '../constant'
import { consolelog } from '../utils'
import { authService } from '../grpc/client'

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async createToken(dataToSend: IAuthGrpcRequest.ICreateTokenData) {
        try {
            return authService.createToken(dataToSend)
        } catch (error) {
            consolelog(process.cwd(), "createToken", error, false)
            return Promise.reject(error)
        }
    }

    // async syncToKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
    //     try {
    //         kafkaService.kafkaSync(payload)
    //         return {}
    //     } catch (error) {
    //         consolelog(process.cwd(), "syncToKafka", error, false)
    //         return Promise.reject(error)
    //     }
    // }
}