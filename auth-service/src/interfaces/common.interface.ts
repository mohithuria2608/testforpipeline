declare namespace ICommonRequest {

    interface IHeaders {
        language: string,
        brand: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        deviceid: string
    }

    interface AuthorizationObj {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        id: string,
        isGuest: number
        authCred?: IAuthCred,
        sessionTime: number
    }

    interface IAuthCred {
        username: string,
        password: string
    }

    interface IError {
        statusCode: number,
        httpCode: number,
        type: string,
        message: string
    }
}