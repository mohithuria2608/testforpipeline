import * as Constant from '../constant'
import { consolelog } from '../utils'
import { orderService } from '../grpc/client';

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    /**
    * @method GRPC
    */
    async updateCart(cartId: string, cmsCart: IPromotionCmsRequest.ICmsCartRes) {
        try {
            return await orderService.updateCart({ cartId: cartId, cmsCart: JSON.stringify(cmsCart) })
        } catch (error) {
            consolelog(process.cwd(), "updateCart", error, false)
            return Promise.reject(error)
        }
    }
}