import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async post(data) {
        try {
            data = this.filterPromotionData(data);
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.couponId,
                replace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "post promotion", error, false)
            return Promise.reject(error)
        }
    }

    /** updates promotion data */
    filterPromotionData(promotionPayload) {
        promotionPayload.dateFrom = new Date(promotionPayload.dateFrom).toISOString();
        promotionPayload.dateTo = new Date(promotionPayload.dateTo).toISOString();
        return promotionPayload;
    }


    async syncFromKafka(payload: ICommonRequest.IKafkaBody) {
        try {
            if (payload.as.create)
                this.createPromotion(JSON.parse(payload.as.argv))
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} data :data of the promotion
    */
    async createPromotion(payload: IPromotionRequest.ICreatePromotion) {
        return this.post(payload);
    }
}