declare namespace IKafkaGrpcRequest {

    export interface IProduceMessageReq {
        request: IProduceMessage
    }

    export interface IProduceMessage {
        data: any
    }

    export interface IProduceMessageRes {

    }
}