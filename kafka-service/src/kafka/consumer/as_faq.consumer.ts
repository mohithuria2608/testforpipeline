import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { syncService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_FAQ
class AsFaqConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_faq", JSON.stringify(message), true)
                this.syncFaq(message);
                return null;
            })
    }

    private async syncFaq(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await syncService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFaq", JSON.stringify(error), false);
            if (message.count > 0) {
                message.count = message.count - 1
                if (message.count == 0) {
                    message.error = JSON.stringify(error)
                    kafkaController.produceToFailureTopic(message)
                }
                else
                    kafkaController.kafkaSync(message)
            } else {
                message.error = JSON.stringify(error)
                kafkaController.produceToFailureTopic(message)
            }
            return {}
        }
    }
}


export const as_faqConsumerE = new AsFaqConsumer();