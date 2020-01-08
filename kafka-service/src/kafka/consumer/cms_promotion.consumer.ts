import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { promotionService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class CmsPromotionConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.CMS_PROMOTION, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IPromotionGrpcRequest.ICreatePromotion) => {
                consolelog(process.cwd(), "consumer cms_promotion", JSON.stringify(message), true)
                this.createPromotion(message);
                return null;
            })
    }

    /** consumes the message and creates promotion on the promotion service */
    private async createPromotion(message: IPromotionGrpcRequest.ICreatePromotion) {
        try {
            let res = await promotionService.createPromotion(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "createPromotion", err, false);
            if (message.count != 0) {
                message.count = message.count - 1
                kafkaController.createPromotion(message)
            }
            else
                kafkaController.produceToFailureTopic(message)
            return {}
        }
    }


}


export const cms_promotionConsumerE = new CmsPromotionConsumer();