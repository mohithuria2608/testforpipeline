import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { locationService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class AsLocationConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.AS_LOCATION, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_location", JSON.stringify(message), true)
                this.syncStores(message);
                return null;
            })
    }

    private async syncStores(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await locationService.syncStores(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "syncStores", error, false);
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


export const as_locationConsumerE = new AsLocationConsumer();