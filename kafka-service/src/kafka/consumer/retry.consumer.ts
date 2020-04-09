import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = config.get("env") + "_" + Constant.KAFKA_TOPIC.RETRY
class RetryConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer retry", JSON.stringify(message), true)
                // switch (message.mainTopic) {
                //     case Constant.KAFKA_TOPIC.SDM_MENU: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.CMS_MENU: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_MENU: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_HOME: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_HIDDEN: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_LOCATION: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.CMS_LOCATION: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_STORE: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.SDM_USER: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.CMS_USER: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_USER: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.CMS_ADDRESS: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.SDM_ADDRESS: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_ADDRESS: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_PROMOTION: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.SDM_ORDER: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.CMS_ORDER: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_CONFIG: {
                //         break;
                //     };
                //     case Constant.KAFKA_TOPIC.AS_APP_VERSION: {
                //         break;
                //     };
                //     default: {
                //         break;
                //     }
                // }
                return null
            })
    }
}


export const retryConsumerE = new RetryConsumer();