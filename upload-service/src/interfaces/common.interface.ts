declare namespace ICommonRequest {

    export interface IHeaders {
        language: string,
        country: string,
        brand: string,
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
        id?: string,
        userData?: any,
    }

    export interface IPagination {
        page?: number,
        // skip?: number
    }

    export interface IError {
        statusCode: number,
        httpCode: number,
        type: string,
        message: string
    }
}