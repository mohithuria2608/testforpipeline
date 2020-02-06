import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService, menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class SdmMenuConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.SDM_MENU, Constant.KAFKA_TOPIC.SDM_MENU);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer sdm_menu", JSON.stringify(message), true)
                this.syncMenu(message);
                return null;
            })
    }

    private async syncMenu(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await menuService.sync(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "syncMenu", JSON.stringify(error), false);
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


export const sdm_menuConsumerE = new SdmMenuConsumer();