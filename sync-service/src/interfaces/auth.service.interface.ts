declare namespace IAuthServiceRequest {

    interface ICreateTokenData {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        id?: string,
        authCred?: IAuthCred
    }

    interface IAuthCred {
        username: string,
        password: string
    }

    interface IVerifyTokenObj {
        token: string,
    }

    interface IToken {
        token: string
    }
}
