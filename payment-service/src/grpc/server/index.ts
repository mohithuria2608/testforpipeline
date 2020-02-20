import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity';
import {  miscController } from '../../controllers';
import * as Constant from '../../constant'

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + config.get("directory.static.proto.payment.server")
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const paymentProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server()

server.addService(paymentProto.PaymentService.service, {
    getPaymentMethods: async (call: IPaymentGrpcRequest.IGetPaymentMethodsReq, callback) => {
        try {
            consolelog(process.cwd(), "getPaymentMethods", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IGetPaymentMethodsRes = await ENTITY.PaymentE.getPaymentMethods(call.request.storeCode);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "getPaymentMethods", JSON.stringify(error), false);
            callback(grpcSendError(error));
        }
    },
    initiatePayment: async (call: IPaymentGrpcRequest.IInitiatePaymentReq, callback) => {
        try {
            consolelog(process.cwd(), "initiatePayment", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IInitiatePaymentRes = await ENTITY.PaymentE.initiatePayment(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "initiatePayment", JSON.stringify(error), false);
            callback(grpcSendError(error));
        }
    },
    getPaymentStatus: async (call: IPaymentGrpcRequest.IGetPaymentStatusReq, callback) => {
        try {
            consolelog(process.cwd(), "getPaymentStatus", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IGetPaymentStatusRes;
            switch (call.request.paymentStatus) {
                case Constant.DATABASE.STATUS.PAYMENT.INITIATED:
                    res = (await ENTITY.PaymentE.getInitiateStatus(call.request)) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case Constant.DATABASE.STATUS.PAYMENT.AUTHORIZED:
                    res = await ENTITY.PaymentE.getAuthorizationStatus(call.request) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case Constant.DATABASE.STATUS.PAYMENT.CANCELLED:
                    res = await ENTITY.PaymentE.getReverseStatus(call.request) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case Constant.DATABASE.STATUS.PAYMENT.CAPTURED:
                    res = await ENTITY.PaymentE.getCaptureStatus(call.request) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                case Constant.DATABASE.STATUS.PAYMENT.REFUNDED:
                    res = await ENTITY.PaymentE.getRefundStatus(call.request) as IPaymentGrpcRequest.IGetPaymentStatusRes;
                    break;
                default:
                    res = await ENTITY.PaymentE.getPaymentStatus(call.request);
                    break;
            }
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "getPaymentStatus", JSON.stringify(error), false);
            callback(grpcSendError(error));
        }
    },
    capturePayment: async (call: IPaymentGrpcRequest.ICapturePaymentReq, callback) => {
        try {
            consolelog(process.cwd(), "capturePayment", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.ICapturePaymentRes = await ENTITY.PaymentE.capturePayment(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "capturePayment", JSON.stringify(error), false);
            callback(grpcSendError(error));
        }
    },
    reversePayment: async (call: IPaymentGrpcRequest.IReversePaymentReq, callback) => {
        try {
            consolelog(process.cwd(), "reversePayment", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IReversePaymentRes = await ENTITY.PaymentE.reversePayment(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "reversePayment", JSON.stringify(error), false);
            callback(grpcSendError(error));
        }
    },
    refundPayment: async (call: IPaymentGrpcRequest.IRefundPaymentReq, callback) => {
        try {
            consolelog(process.cwd(), "refundPayment", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IRefundPaymentRes = await ENTITY.PaymentE.refundPayment(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "refundPayment", JSON.stringify(error), false);
            callback(grpcSendError(error));
        }
    },
    sync: async (call: IKafkaGrpcRequest.IKafkaReq, callback) => {
        try {
            consolelog(process.cwd(), "sync", JSON.stringify(call.request), true)
            let data = call.request
            let res: any
            switch (data.set) {
                case Constant.SET_NAME.PING_SERVICE: {
                    res = await miscController.pingService(data)
                    break;
                }
            }
            callback(null, res)
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            callback(grpcSendError(error))
        }
    }
})

server.bind(config.get("grpc.payment.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.payment.server"), true)
server.start();

