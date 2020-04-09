import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { menuService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = topicNameCreator(config.get("env") ,Constant.KAFKA_TOPIC.SDM_MENU)

class SdmMenuConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer sdm_menu", JSON.stringify(message), true)
                this.syncMenu(message);
                return null;
            })
    }

    async syncMenu(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await menuService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncMenu", JSON.stringify(error), false);
            switch (message.count) {
                case 1:
                case 2:
                case 3: {
                    message.count = message.count + 1
                    kafkaController.kafkaSync(message)
                    break;
                }
                default: {
                    message.error = JSON.stringify(error)
                    kafkaController.produceToFailureTopic(message)
                    break;
                }
            }
            return {}
        }
    }
}


export const sdm_menuConsumerE = new SdmMenuConsumer();