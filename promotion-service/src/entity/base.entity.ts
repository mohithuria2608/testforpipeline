import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'
import { orderService } from '../grpc/client';

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    /**
     * @method INTERNAL
     */
    async post(data: IPromotionRequest.IPromoData) {
        try {
            data = this.filterPromotionData(data);
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.cmsCouponRef,
                create: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "post promotion", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method INTERNAL
     * @description :  updates promotion data
     */
    filterPromotionData(promotionPayload) {
        promotionPayload.dateFrom = new Date(promotionPayload.dateFrom).toISOString();
        promotionPayload.dateTo = new Date(promotionPayload.dateTo).toISOString();
        return promotionPayload;
    }

    /**
    * @method GRPC
    */
    async syncFromKafka(payload: ICommonRequest.IKafkaBody) {
        try {
            if (payload.as.create) {

            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    */
    async updateCart(curItems: IMenuGrpcRequest.IProduct[], cmsCart: IOrderGrpcRequest.ICmsCartRes) {
        try {
            return await orderService.updateCart({ curItems: curItems, cmsCart: cmsCart })
        } catch (error) {
            consolelog(process.cwd(), "updateCart", error, false)
            return Promise.reject(error)
        }
    }
}