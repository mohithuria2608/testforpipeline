declare namespace INotificationGrpcRequest {

    interface ISendSms {
        message: string,
        destination: string,
        type: number,
        dlr: number,
    }

    interface ISendSmsRes {

    }
}
