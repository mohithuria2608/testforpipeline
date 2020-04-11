import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { syncService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = topicNameCreator(config.get("env") ,Constant.KAFKA_TOPIC.AS_APP_VERSION)
class AsAppversionConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_app_version", "", true)
                this.syncAppversion(message);
                return null;
            })
    }

    async syncAppversion(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await syncService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncAppversion", JSON.stringify(error), false);
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


export const as_appversionConsumerE = new AsAppversionConsumer();