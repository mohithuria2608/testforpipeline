import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { homeService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class AsHomeConsumer extends BaseConsumer {

    constructor() {
        super(process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_HOME,config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_HOME);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_home", JSON.stringify(message), true)
                this.syncHomeData(message);
                return null;
            })
    }

    private async syncHomeData(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count >= 0) {
                let res = await homeService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncHomeData", JSON.stringify(error), false);
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


export const as_homeConsumerE = new AsHomeConsumer();