declare namespace IAuthServiceRequest {

    interface ICreateTokenData {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        id?: string,
    }

    interface IVerifyTokenObj {
        token: string,
    }

    interface IToken {
        token: string
    }
}
