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

    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await orderServiceValidator.syncValidator(payload)
                this.orderClient.sync(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully synced menu on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing menu on cms", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // async createSdmOrder(payload: IOrderGrpcRequest.ICreateSdmOrder): Promise<IOrderGrpcRequest.IGetSdmOrderRes> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await orderServiceValidator.createSdmOrderValidator(payload)
    //             this.orderClient.getSdmOrder({}, (err, res) => {
    //                 if (!err) {
    //                     consolelog(process.cwd(), "successfully created order on sdm", JSON.stringify(res), false)
    //                     resolve(res.store)
    //                 } else {
    //                     consolelog(process.cwd(), "Error in  creating order on sdm", JSON.stringify(err), false)
    //                     reject(err)
    //                 }
    //             })
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }

    // async getSdmOrder(payload: IOrderGrpcRequest.IGetSdmOrder): Promise<IOrderGrpcRequest.IGetSdmOrderRes> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await orderServiceValidator.getSdmOrderValidator(payload)
    //             this.orderClient.getSdmOrder({
    //                 cartId: payload.cartId,
    //                 sdmOrderRef: payload.sdmOrderRef,
    //                 status: payload.status,
    //                 timeInterval: payload.timeInterval,
    //             }, (err, res) => {
    //                 if (!err) {
    //                     consolelog(process.cwd(), "successfully fetched order status", JSON.stringify(res), false)
    //                     resolve(res.store)
    //                 } else {
    //                     consolelog(process.cwd(), "Error in fetching order status", JSON.stringify(err), false)
    //                     reject(err)
    //                 }
    //             })
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }
}

export const orderService = new OrderService();