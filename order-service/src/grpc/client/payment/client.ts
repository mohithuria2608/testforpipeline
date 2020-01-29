import * as config from "config"
import { paymentServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog, sendError } from '../../../utils'

export class PaymentService {

    private authProto = __dirname + config.get("directory.static.proto.payment.client");
    private packageDefinition = protoLoader.loadSync(
        this.authProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadPayment = grpc.loadPackageDefinition(this.packageDefinition).PaymentService
    private paymentClient = new this.loadPayment(config.get("grpc.payment.client"), grpc.credentials.createInsecure());

    constructor() {
        console.log(process.cwd(), 'GRPC connection established payment-service', config.get("grpc.payment.client"), true)
    }

    async initiatePayment(payload: IPaymentGrpcRequest.IInitiatePayment): Promise<IPaymentGrpcRequest.IInitiatePaymentRes> {
        return new Promise(async (resolve, reject) => {
            await paymentServiceValidator.initiatePaymentValidator(payload)
            this.paymentClient.initiatePayment(payload, (error, res) => {
                if (!error) {
                    consolelog(process.cwd(), "successfully initiated payment", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog(process.cwd(), "Error in initiating payment", JSON.stringify(error), false)
                    reject(sendError(error))
                }
            })
        })
    }

    async getPaymentStatus(payload: IPaymentGrpcRequest.IGetPaymentStatus): Promise<IPaymentGrpcRequest.IGetPaymentStatusRes> {
        return new Promise(async (resolve, reject) => {
            await paymentServiceValidator.getPaymentStatusValidator(payload)
            this.paymentClient.getPaymentStatus(payload, (error, res) => {
                if (!error) {
                    consolelog(process.cwd(), "successfully fetched payment status", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog(process.cwd(), "Error in fetching payment status", JSON.stringify(error), false)
                    reject(sendError(error))
                }
            })
        })
    }

    async capturePayment(payload: IPaymentGrpcRequest.ICapturePayment): Promise<IPaymentGrpcRequest.ICapturePaymentRes> {
        return new Promise(async (resolve, reject) => {
            await paymentServiceValidator.capturePaymentValidator(payload)
            this.paymentClient.capturePayment(payload, (error, res) => {
                if (!error) {
                    consolelog(process.cwd(), "successfully captured payment", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog(process.cwd(), "Error in capturing payment", JSON.stringify(error), false)
                    reject(sendError(error))
                }
            })
        })
    }
}

export const paymentService = new PaymentService();