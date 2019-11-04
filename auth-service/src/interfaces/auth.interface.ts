declare namespace IAuthServiceRequest {

    interface ICreateToken {
        request: ICreateTokenData
    }

    interface ICreateTokenData {
        deviceId: string,
        devicetype: string,
        tokenType: string,
        id?: string,
    }

    interface IVerifyToken {
        request: IToken
    }

    interface IToken {
        token: string
    }

}
