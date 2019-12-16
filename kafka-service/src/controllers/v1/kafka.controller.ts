import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { kafkaProducerE } from '../../kafka'

export class KafkaController {

    constructor() { }

    /**
     * @method KAFKA
     * @description : In case of failure of consumer produce data in failure topic (UNIVERSAL)
     * */
    async produceToFailureTopic(payload: any) {
        try {
            consolelog(process.cwd(),"produce data in failed KAFKA q", payload, true)
            kafkaProducerE.sendMessage({
                messages: JSON.stringify(payload),
                topic: Constant.KAFKA_TOPIC.FAIL_Q,
                partition: 0,
            });
            return {}
        } catch (err) {
            consolelog(process.cwd(),"produceToFailureTopic", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GRPC
     * @param {string} aerospikeId :any
     * @param {string} lastname :any
     * @param {string} firstname :any
     * @param {string} email :any
     * @param {number} storeId :any
     * @param {number} websiteId :any
     * @param {number} password :any
     * */
    async syncUser(payload: IUserGrpcRequest.ICreateUserData) {
        try {
            consolelog(process.cwd(),"produce user in KAFKA service", payload, true)
            kafkaProducerE.sendMessage({
                messages: JSON.stringify(payload),
                topic: Constant.KAFKA_TOPIC.NEW_USER,
                partition: 0,
            });
            return {}
        } catch (err) {
            consolelog(process.cwd(),"syncUser", err, false)
            return Promise.reject(err)
        }
    }
}

export const kafkaController = new KafkaController();