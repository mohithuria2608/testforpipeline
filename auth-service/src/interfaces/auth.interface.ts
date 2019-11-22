declare namespace IAuthServiceRequest {

    interface ICreateToken {
        request: ICreateTokenData
    }

    interface ICreateTokenData {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        id?: string,
    }

    interface IVerifyToken {
        request: IVerifyTokenObj
    }

    interface IVerifyTokenObj {
        token: string,
        tokenType: string,
    }

    interface IToken {
        token: string
    }

}
