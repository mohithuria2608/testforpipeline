declare namespace ISmsRequest {

    interface ISingleSms {
        message: string,
        destination: string,
        type: string,
        dlr: number,
    }
}