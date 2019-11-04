declare namespace IAuthServiceRequest {

    interface ICreateTokenData {
        deviceId: string,
        devicetype: string,
        tokenType: string,
        id?: string,
    }

    interface IVerifyTokenObj {
        token: string,
        tokenType: string,
    }

    interface IToken {
        token: string
    }
}
