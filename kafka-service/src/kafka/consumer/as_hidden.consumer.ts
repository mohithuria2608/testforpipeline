import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator, generateRandomString } from "../../utils"
import { menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = topicNameCreator(config.get("env"),Constant.KAFKA_TOPIC.AS_HIDDEN)
const groupId = generateRandomString(16)

class AsHiddenConsumer extends BaseConsumer {

    constructor() {
         super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_hidden", "", true)
                this.syncHidden(message);
                return null;
            })
    }

    async syncHidden(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await menuService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false);
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


export const as_hiddenConsumerE = new AsHiddenConsumer();