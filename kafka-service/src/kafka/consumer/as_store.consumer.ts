import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { locationService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = topicNameCreator(config.get("env") ,Constant.KAFKA_TOPIC.AS_STORE)

class AsStoreConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_store", "", true)
                this.syncStores(message);
                return null;
            })
    }

    async syncStores(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await locationService.postLocationDataToCMS(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "syncStores", JSON.stringify(error), false);
            switch (message.count) {
                case 1:
                case 2:
                case 3: {
                    message.count = message.count + 1
                    kafkaController.kafkaSync(message)
                    break;
                }
                default: {
                    message.error = JSON.stringify(error)
                    kafkaController.produceToFailureTopic(message)
                    break;
                }
            }
            return {}
        }
    }
}


export const as_storeConsumerE = new AsStoreConsumer();