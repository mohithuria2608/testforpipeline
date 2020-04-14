import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, generateRandomString } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = config.get("env") + "_" + Constant.KAFKA_TOPIC.SYNC_Q
const groupId = generateRandomString(16)
class SyncConsumer extends BaseConsumer {

    constructor() {
        super(topic, groupId);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer sync", "", true)
                return null
            }
        );
    }
}


export const syncConsumerE = new SyncConsumer();