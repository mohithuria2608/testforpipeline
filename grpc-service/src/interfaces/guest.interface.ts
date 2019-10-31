declare namespace IGuestRequest {

    interface IGuestLogin extends ICommonRequest.IHeaders {
        deviceId: string
    }
}
