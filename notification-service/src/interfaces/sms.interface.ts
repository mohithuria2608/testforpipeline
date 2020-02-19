declare namespace ISmsRequest {

    interface ISingleSms {
        message: string,
        destination: string,
        type: number,
        dlr: number,
    }
}