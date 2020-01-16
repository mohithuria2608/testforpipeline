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
    * @param {string} data  actuall array of menu or upsell
    */
    async syncPromoFromKafka(payload: IPromotionGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {

                }
                if (payload.as.update) {

                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncPromoFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    */
    async updateCart(cartId: string, curItems: IMenuGrpcRequest.IProduct[], cmsCart: IOrderGrpcRequest.ICmsCartRes) {
        try {
            return await orderService.updateCart({ cartId: cartId, curItems: JSON.stringify(curItems), cmsCart: JSON.stringify(cmsCart) })
        } catch (error) {
            consolelog(process.cwd(), "updateCart", error, false)
            return Promise.reject(error)
        }
    }
}