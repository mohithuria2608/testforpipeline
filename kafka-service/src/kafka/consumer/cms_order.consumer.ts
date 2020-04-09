import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { orderService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_ORDER

class CmsOrderStatusConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_order", JSON.stringify(message), true)
                this.cmsOrder(message);
                return null;
            })
    }

    private async cmsOrder(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count >= 0)
                await orderService.sync(message)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "cmsOrder", JSON.stringify(error), false);
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


export const cms_orderConsumerE = new CmsOrderStatusConsumer();