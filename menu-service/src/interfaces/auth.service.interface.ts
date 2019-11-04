declare namespace IAuthServiceRequest {

    interface IVerifyTokenObj {
        token: string,
        tokenType: string,
    }

    interface IToken {
        token: string
    }
}
