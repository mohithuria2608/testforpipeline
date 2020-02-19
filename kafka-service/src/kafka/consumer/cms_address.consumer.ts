import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class CmsAddressConsumer extends BaseConsumer {

    constructor() {
        super(process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_ADDRESS, process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_ADDRESS);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_address", JSON.stringify(message), true)
                this.syncAddress(message);
                return null
            })
    }

    private async syncAddress(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count >= 0) {
                let res = await userService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncAddress", JSON.stringify(error), false);
            if (message.count > 0) {
                message.count = message.count - 1
                kafkaController.kafkaSync(message)
            }
            else
                kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const cms_addressConsumerE = new CmsAddressConsumer();