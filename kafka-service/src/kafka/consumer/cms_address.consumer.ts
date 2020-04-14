import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator, generateRandomString } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = topicNameCreator(config.get("env") ,Constant.KAFKA_TOPIC.CMS_ADDRESS)
const groupId = generateRandomString(16)

class CmsAddressConsumer extends BaseConsumer {

    constructor() {
         super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_address", "", true)
                this.syncAddress(message);
                return null
            })
    }

    async syncAddress(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await userService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncAddress", JSON.stringify(error), false);
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


export const cms_addressConsumerE = new CmsAddressConsumer();