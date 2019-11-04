declare namespace IAuthServiceRequest {

    interface ICreateTokenData {
        deviceId: string,
        devicetype: string,
        tokenType: string,
        id?: string,
    }

    interface IToken {
        token: string
    }
}
