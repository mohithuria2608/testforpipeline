import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { syncService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class AsMenuConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.AS_CONFIG, 'client');
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
            let res = await syncService.syncConfig(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "syncConfig", err, false);
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