import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import {  menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_UPSELL

class AsUpsellConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_upsell", JSON.stringify(message), true)
                this.syncUpsell(message);
                return null;
            })
    }

    private async syncUpsell(message: IKafkaRequest.IKafkaBody) {
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
                if (message.count == 0)
                    kafkaController.produceToFailureTopic(message)
                else
                    kafkaController.kafkaSync(message)
            } else
                kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const as_upsellConsumerE = new AsUpsellConsumer();