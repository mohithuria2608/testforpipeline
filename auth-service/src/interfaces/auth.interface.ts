declare namespace IAuthServiceRequest {

    interface ICreateToken {
        request: ICreateTokenData
    }

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

    interface IVerifyToken {
        request: IVerifyTokenObj
    }

    interface IVerifyTokenObj {
        token: string,
    }

    interface IToken {
        token: string
    }

}
