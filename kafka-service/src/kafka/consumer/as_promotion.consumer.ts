import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { promotionService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class AsPromotionConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.AS_PROMOTION, 'client');
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
            let res = await promotionService.sync(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "syncPromotion", err, false);
            if (message.count != 0) {
                message.count = message.count - 1
                kafkaController.kafkaSync(message)
            }
            else
                kafkaController.produceToFailureTopic(message)
            return {}
        }
    }


}


export const as_promotionConsumerE = new AsPromotionConsumer();