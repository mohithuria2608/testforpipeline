import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_HIDDEN

class AsHiddenConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_hidden", JSON.stringify(message), true)
                this.syncHidden(message);
                return null;
            })
    }

    private async syncHidden(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await menuService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false);
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


export const as_hiddenConsumerE = new AsHiddenConsumer();