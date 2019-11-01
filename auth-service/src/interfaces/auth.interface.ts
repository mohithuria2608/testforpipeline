declare namespace IAuthServiceRequest {

    interface ICreateTokenForUserService {
        request: ITokenData
    }

    interface ITokenData {
        tokenType: string,
        deviceId: string,
        id?: string,
    }
}
