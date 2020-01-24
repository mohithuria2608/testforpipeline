declare namespace IAuthGrpcRequest {

    interface ICreateTokenData {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        isGuest: number,
        id?: string,
        sessionTime: number
    }

    interface IVerifyTokenObj {
        token: string,
    }

    interface IToken {
        token: string
    }
}
