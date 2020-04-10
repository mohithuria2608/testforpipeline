import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_USER)

class CmsUserConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_user", JSON.stringify(message), true)
                this.syncUser(message);
                return null
            })
    }

    async syncUser(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await userService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncUser", JSON.stringify(error), false);
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


export const cms_userConsumerE = new CmsUserConsumer();