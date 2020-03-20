import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { locationService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class ASLocationConsumer extends BaseConsumer {

    constructor() {
        super(process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_LOCATION, process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_LOCATION);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_location", JSON.stringify(message), true)
                this.syncLocationFromCMS(message);
                return null;
            })
    }

    private async syncLocationFromCMS(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await locationService.syncLocationFromCMS(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "syncLocationFromCMS", JSON.stringify(error), false);
            if (message.count > 0) {
                message.count = message.count - 1
                kafkaController.kafkaSync(message)
            }
            else if (message.count == -1) {
                /**
                 * @description : ignore
                 */
            }
            else {
                message.error = JSON.stringify(error)
                kafkaController.produceToFailureTopic(message)
            }
            return {}
        }
    }
}


export const as_locationConsumerE = new ASLocationConsumer();