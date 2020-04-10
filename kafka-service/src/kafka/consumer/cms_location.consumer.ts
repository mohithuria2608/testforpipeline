import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { locationService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_LOCATION)

class CMSLocationConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer cms_location", JSON.stringify(message), true)
                this.postLocationDataToCMS(message);
                return null;
            })
    }

    async postLocationDataToCMS(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await locationService.postLocationDataToCMS(message)
                return res
            } else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncStores", JSON.stringify(error), false);
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


export const cms_locationConsumerE = new CMSLocationConsumer();