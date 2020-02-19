import * as config from "config"
import { orderServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class OrderService {

    private orderProto = __dirname + config.get("directory.static.proto.order.client");
    private packageDefinition = protoLoader.loadSync(
        this.orderProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadOrder = grpc.loadPackageDefinition(this.packageDefinition).OrderService
    private orderClient = new this.loadOrder(config.get("grpc.order.client"), grpc.credentials.createInsecure());

    constructor() {
        console.log(process.cwd(), 'GRPC connection established order-service', config.get("grpc.order.client"), true)
    }

    async getCart(payload: IOrderGrpcRequest.IGetOrder): Promise<IOrderGrpcRequest.IGetOrderRes> {
        return new Promise(async (resolve, reject) => {
            try {
                await orderServiceValidator.getCartValidator(payload)
                this.orderClient.getCart(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully received cart", JSON.stringify(res.cart), false)
                        resolve(JSON.parse(res.cart))
                    } else {
                        consolelog(process.cwd(), "Error in receiveing cart", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const orderService = new OrderService();