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
        consolelog(process.cwd(), 'GRPC connection established order-service', config.get("grpc.order.client"), true)
    }

    async updateCart(payload: IOrderGrpcRequest.IUpdateOrder): Promise<IOrderGrpcRequest.IUpdateOrderRes> {
        return new Promise(async (resolve, reject) => {
            try {
                await orderServiceValidator.updateCartValidator(payload)
                this.orderClient.updateCart(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully updated cart", JSON.stringify(res), false)
                        resolve(res.store)
                    } else {
                        consolelog(process.cwd(), "Error in updating cart", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const orderService = new OrderService();