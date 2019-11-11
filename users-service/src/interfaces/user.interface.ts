declare namespace IUserRequest {
    interface IRefreshToken extends ICommonRequest.IHeaders {
        deviceId: string
    }
}