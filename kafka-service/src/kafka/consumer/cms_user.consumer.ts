import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class CmsUserConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.CMS_USER, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_user", JSON.stringify(message), true)
                this.syncUser(message);
                return null
            })
    }

    private async syncUser(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await userService.sync(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "syncUser", err, false);
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


export const cms_userConsumerE = new CmsUserConsumer();