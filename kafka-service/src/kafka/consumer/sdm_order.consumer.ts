import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { orderService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class SdmOrderStatusConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.SDM_ORDER, Constant.KAFKA_TOPIC.SDM_ORDER);
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
            return {}
        } catch (error) {
            consolelog(process.cwd(), "sdmOrder", JSON.stringify(error), false);
            if (message.count > 0) {
                message.count = message.count - 1
                kafkaController.kafkaSync(message)
            }
            else if (message.count == -1) {
                /**
                 * @description : ignore
                 */
            }
            else
                kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const sdm_orderConsumerE = new SdmOrderStatusConsumer();