import * as config from "config"
import { paymentServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class PaymentService {

    private paymentProto = __dirname + config.get("directory.static.proto.payment.client");
    private packageDefinition = protoLoader.loadSync(
        this.paymentProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadPayment = grpc.loadPackageDefinition(this.packageDefinition).PaymentService
    private paymentClient

    constructor() {
        this.paymentClient = new this.loadPayment(config.get("grpc.payment.client"), grpc.credentials.createInsecure());
    }

    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await paymentServiceValidator.syncValidator(payload)
                this.paymentClient.sync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced payment", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing payment", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const paymentService = new PaymentService();