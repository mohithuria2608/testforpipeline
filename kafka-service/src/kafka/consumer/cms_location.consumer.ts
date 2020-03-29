import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { locationService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class CMSLocationConsumer extends BaseConsumer {

    constructor() {
        super(process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_LOCATION, process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_LOCATION);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_location", JSON.stringify(message), true)
                this.postLocationDataToCMS(message);
                return null;
            })
    }

    private async postLocationDataToCMS(message: IKafkaRequest.IKafkaBody) {
        try {
            let res = await locationService.postLocationDataToCMS(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), "syncStores", JSON.stringify(error), false);
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


export const cms_locationConsumerE = new CMSLocationConsumer();