import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { menuService } from '../../grpc/client'
import { sendSuccess } from '../../utils'
import * as ENTITY from '../../entity'

export class OrderController {

    constructor() { }

    /**
     * @method GET
     * */
    async orderHistory(headers: ICommonRequest.IHeaders, payload: IOrderRequest.IOrderHistory, auth: ICommonRequest.AuthorizationObj) {
        try {
            
            return []
        } catch (err) {
            consolelog(process.cwd(), "orderHistory", err, false)
            return Promise.reject(err)
        }
    }
}

export const orderController = new OrderController();