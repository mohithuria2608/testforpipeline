import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { promotionService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_PROMOTION

class AsPromotionConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_promotion", JSON.stringify(message), true)
                this.syncPromotion(message);
                return null;
            })
    }

    /** consumes the message and creates promotion on the promotion service */
    private async syncPromotion(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await promotionService.sync(message)
                return res
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncPromotion", JSON.stringify(error), false);
            if (message.count > 0) {
                message.count = message.count - 1
                if (message.count == 0){
                    message.error = JSON.stringify(error)
                    kafkaController.produceToFailureTopic(message)
                }
                else
                    kafkaController.kafkaSync(message)
            } else{
                message.error = JSON.stringify(error)
                kafkaController.produceToFailureTopic(message)
            }
            return {}
        }
    }


}


export const as_promotionConsumerE = new AsPromotionConsumer();