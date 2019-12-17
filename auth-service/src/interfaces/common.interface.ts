declare namespace ICommonRequest {

    export interface IHeaders {
        language: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        deviceid: string
    }

    export interface AuthorizationObj {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        id: string,
        authCred?: IAuthCred
    }

    interface IAuthCred {
        username: string,
        password: string
    }

    export interface IError {
        statusCode: number,
        httpCode: number,
        type: string,
        message: string
    }
}