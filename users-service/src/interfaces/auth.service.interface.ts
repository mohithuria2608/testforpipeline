declare namespace IAuthServiceRequest {

    interface ICreateToken {
        deviceId: string,
        devicetype: string,
        tokenType: string,
    }

    interface ICreateTokenRes {
        token: string
    }
}
