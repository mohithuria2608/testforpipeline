import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator, generateRandomString } from "../../utils"
import { promotionService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

const topic = topicNameCreator(config.get("env"),Constant.KAFKA_TOPIC.AS_PROMOTION)
const groupId = generateRandomString(16)

class AsPromotionConsumer extends BaseConsumer {

    constructor() {
         super(topic, groupId);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_promotion", "", true)
                this.syncPromotion(message);
                return null;
            })
    }

    /** consumes the message and creates promotion on the promotion service */
    async syncPromotion(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await promotionService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncPromotion", JSON.stringify(error), false);
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


export const as_promotionConsumerE = new AsPromotionConsumer();