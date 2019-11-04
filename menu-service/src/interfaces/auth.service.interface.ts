declare namespace IAuthServiceRequest {

    interface IVerifyToken {
        token: string
    }

    interface IPostVerifyTokenRes {
        tokenType: string,
        deviceId: string,
        devicetype: string,
        id?: string
    }

}
