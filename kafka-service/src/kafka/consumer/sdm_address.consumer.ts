import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_ADDRESS

class SdmAddressConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer sdm_address", JSON.stringify(message), true)
                this.syncAddress(message);
                return null
            })
    }

    private async syncAddress(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await userService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncAddress", JSON.stringify(error), false);
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


export const sdm_addressConsumerE = new SdmAddressConsumer();