import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { orderService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class SdmOrderStatusConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.SDM_MENU, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer sdm_order", JSON.stringify(message), true)
                this.sdmOrder(message);
                return null;
            })
    }

    private async sdmOrder(message: IKafkaRequest.IKafkaBody) {
        try {
            await orderService.sync(message)
            // if (message.sdm.create)
            //     await orderService.createSdmOrder(JSON.parse(message.sdm.argv))
            // if (message.sdm.get)
            //     await orderService.getSdmOrder(JSON.parse(message.sdm.argv))
            return {}
        } catch (error) {
            consolelog(process.cwd(), "sdmOrder", error, false);
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


export const sdm_menuConsumerE = new SdmOrderStatusConsumer();