import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService, menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_MENU

class CmsMenuConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
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
            if (message.count >=0) {
                let res = await menuService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncMenu", JSON.stringify(error), false);
            if (message.count > 0) {
                message.count = message.count - 1
                if (message.count == 0){
                    message.error = JSON.stringify(error)
                    kafkaController.produceToFailureTopic(message)
                }
                else
                    kafkaController.kafkaSync(message)
            } else{
                message.error = JSON.stringify(error)
                kafkaController.produceToFailureTopic(message)
            }
            return {}
        }
    }
}


export const cms_menuConsumerE = new CmsMenuConsumer();