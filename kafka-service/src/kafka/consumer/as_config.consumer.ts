import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { syncService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_CONFIG
class AsConfigConsumer extends BaseConsumer {

    constructor() {
        super(process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_CONFIG, process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_CONFIG);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_config", JSON.stringify(message), true)
                this.syncConfig(message);
                return null;
            })
    }

    private async syncConfig(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count >= 0) {
                let res = await syncService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncConfig", JSON.stringify(error), false);
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


export const as_configConsumerE = new AsConfigConsumer();