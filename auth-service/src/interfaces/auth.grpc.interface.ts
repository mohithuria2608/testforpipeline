declare namespace IAuthGrpcRequest {

    interface ICreateToken {
        request: ICreateTokenData
    }

    interface ICreateTokenData {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        id?: string,
        isGuest: number,
        sessionTime: number,
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
