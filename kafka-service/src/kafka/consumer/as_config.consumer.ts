import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator, generateRandomString } from "../../utils"
import { syncService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_CONFIG)
const groupId = generateRandomString(16)

class AsConfigConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_config", "", true)
                this.syncConfig(message);
                return null;
            })
    }

    async syncConfig(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await syncService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncConfig in error ", message.count, false);
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


export const as_configConsumerE = new AsConfigConsumer();