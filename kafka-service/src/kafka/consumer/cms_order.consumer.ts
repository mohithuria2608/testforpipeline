import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator, generateRandomString } from "../../utils"
import { orderService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = topicNameCreator(config.get("env") , Constant.KAFKA_TOPIC.CMS_ORDER)
const groupId = generateRandomString(16)

class CmsOrderStatusConsumer extends BaseConsumer {

    constructor() {
         super(topic, groupId);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_order", "", true)
                this.cmsOrder(message);
                return null;
            })
    }

    async cmsOrder(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                await orderService.sync(message)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "cmsOrder", JSON.stringify(error), false);
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


export const cms_orderConsumerE = new CmsOrderStatusConsumer();