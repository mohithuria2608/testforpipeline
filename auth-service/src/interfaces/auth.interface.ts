declare namespace IAuthServiceRequest {

    interface ICreateTokenForUser {
        request: ITokenData
    }

    interface ITokenData {
        tokenType: string,
        deviceId?: string,
        devicetype?: string,
        id?: string,
    }

    interface IVerifyTokenForUser {
        request: IToken
    }

    interface IToken {
        token: string
    }

    interface IPostVerifyTokenRes {
        tokenType: string,
        deviceId: string,
        devicetype: string,
        id?: string,
    }
}
