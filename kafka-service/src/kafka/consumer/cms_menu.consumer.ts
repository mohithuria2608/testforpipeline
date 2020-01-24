import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService, menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class CmsMenuConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.CMS_MENU, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_menu", JSON.stringify(message), true)
                this.syncMenu(message);
                return null;
            })
    }

    private async syncMenu(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await menuService.sync(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "syncMenu", error, false);
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


export const cms_menuConsumerE = new CmsMenuConsumer();