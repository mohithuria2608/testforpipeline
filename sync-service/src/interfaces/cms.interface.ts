declare namespace ICmsRequest {

    interface ICmsAuth extends ICommonRequest.IHeaders {
        username: string,
        password: string
    }
}
