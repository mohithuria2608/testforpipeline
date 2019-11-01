declare namespace IAuthServiceRequest {

    interface ICreateToken {
        deviceId: string,
        tokenType: string,
    }

    interface ICreateTokenRes {
        token: string
    }
}
