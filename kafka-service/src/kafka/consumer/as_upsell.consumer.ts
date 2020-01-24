import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import {  menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class AsUpsellConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.AS_UPSELL, 'client');
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
            let res = await menuService.sync(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "sync", error, false);
            if (message.count != 0) {
                message.count = message.count - 1
                kafkaController.kafkaSync(message)
            }
            else
                kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const as_upsellConsumerE = new AsUpsellConsumer();