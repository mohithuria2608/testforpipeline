import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { kafkaProducerE } from '../../kafka'

export class KafkaController {

    constructor() { }

    /**
     * @param {object} data :any
     * */
    async produceMessage(payload: IKafkaGrpcRequest.IProduceMessage) {
        try {
            consolelog("produceMessage in KAFKA service", payload, true)
            kafkaProducerE.sendMessage({
                messages: JSON.stringify(payload.data),
                topic: Constant.KAFKA_TOPIC.NEW_MENU,
                partition: 0,
            });

            // initConsumers()
        } catch (err) {
            consolelog("produceMessage", err, false)
            return Promise.reject(err)
        }
    }
}

export const kafkaController = new KafkaController();