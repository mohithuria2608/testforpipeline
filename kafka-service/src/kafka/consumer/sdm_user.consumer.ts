import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class SdmUserConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.SDM_USER, Constant.KAFKA_TOPIC.SDM_USER);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer sdm_user", JSON.stringify(message), true)
                this.syncUser(message);
                return null
            })
    }

    private async syncUser(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await userService.sync(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "syncUser", error, false);
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


export const sdm_userConsumerE = new SdmUserConsumer();