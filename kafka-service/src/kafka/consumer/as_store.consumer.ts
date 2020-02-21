import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { locationService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_STORE

class AsStoreConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_store", JSON.stringify(message), true)
                this.syncStores(message);
                return null;
            })
    }

    private async syncStores(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await locationService.syncStores(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "syncStores", JSON.stringify(error), false);
            if (message.count > 0) {
                message.count = message.count - 1
                if (message.count == 0){
                    message.error = JSON.stringify(error)
                    kafkaController.produceToFailureTopic(message)
                }
                else
                    kafkaController.kafkaSync(message)
            } else{
                message.error = JSON.stringify(error)
                kafkaController.produceToFailureTopic(message)
            }
            return {}
        }
    }
}


export const as_storeConsumerE = new AsStoreConsumer();