import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = config.get("env") + "_" + Constant.KAFKA_TOPIC.SYNC_Q
class SyncConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer sync", JSON.stringify(message), true)
                return null
            }
        );
    }
}


export const syncConsumerE = new SyncConsumer();