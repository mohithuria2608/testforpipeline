import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { homeService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class AsHomeConsumer extends BaseConsumer {

    constructor() {
        super(process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_HOME, topicNameCreator(config.get("env"),Constant.KAFKA_TOPIC.AS_HOME));
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_home", JSON.stringify(message), true)
                this.syncHomeData(message);
                return null;
            })
    }

    async syncHomeData(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await homeService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncHomeData", JSON.stringify(error), false);
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


export const as_homeConsumerE = new AsHomeConsumer();