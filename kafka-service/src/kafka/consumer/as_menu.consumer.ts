import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService, menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class AsMenuConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.AS_MENU, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_menu", JSON.stringify(message), true)
                this.syncMenu(message);
                return null;
            })
    }

    private async syncMenu(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await menuService.sync(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "syncMenu", err, false);
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


export const as_menuConsumerE = new AsMenuConsumer();