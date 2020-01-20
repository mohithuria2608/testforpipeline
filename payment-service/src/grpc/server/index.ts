import * as config from "config"
import { consolelog, grpcSendError } from "../../utils"
import * as ENTITY from '../../entity'

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
            consolelog(process.cwd(), "getPaymentMethods", error, false);
            callback(grpcSendError(error));
        }
    },
    initiatePayment: async (call: IPaymentGrpcRequest.IInitiatePaymentReq, callback) => {
        try {
            consolelog(process.cwd(), "initiatePayment", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IInitiatePaymentRes = await ENTITY.PaymentE.initiatePayment(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "initiatePayment", error, false);
            callback(grpcSendError(error));
        }
    },
    getPaymentStatus: async (call: IPaymentGrpcRequest.IGetPaymentStatusReq, callback) => {
        try {
            consolelog(process.cwd(), "getPaymentStatus", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IGetPaymentStatusRes = await ENTITY.PaymentE.getPaymentStatus(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "getPaymentStatus", error, false);
            callback(grpcSendError(error));
        }
    },
    capturePayment: async (call: IPaymentGrpcRequest.ICapturePaymentReq, callback) => {
        try {
            consolelog(process.cwd(), "capturePayment", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.ICapturePaymentRes = await ENTITY.PaymentE.capturePayment(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "capturePayment", error, false);
            callback(grpcSendError(error));
        }
    },
    reversePayment: async (call: IPaymentGrpcRequest.IReversePaymentReq, callback) => {
        try {
            consolelog(process.cwd(), "reversePayment", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IReversePaymentRes = await ENTITY.PaymentE.reversePayment(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "reversePayment", error, false);
            callback(grpcSendError(error));
        }
    },
    refundPayment: async (call: IPaymentGrpcRequest.IRefundPaymentReq, callback) => {
        try {
            consolelog(process.cwd(), "refundPayment", JSON.stringify(call.request), true);
            let res: IPaymentGrpcRequest.IRefundPaymentRes = await ENTITY.PaymentE.refundPayment(call.request);
            callback(null, res);
        } catch (error) {
            consolelog(process.cwd(), "refundPayment", error, false);
            callback(grpcSendError(error));
        }
    },

})

server.bind(config.get("grpc.payment.server"), grpc.ServerCredentials.createInsecure())

consolelog(process.cwd(), "GRPC server running at", config.get("grpc.payment.server"), true)
server.start();

