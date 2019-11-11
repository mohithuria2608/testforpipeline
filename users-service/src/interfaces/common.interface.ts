declare namespace ICommonRequest {

    export interface IHeaders {
        language: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
    }

    export interface AuthorizationObj {
        deviceId: string,
        devicetype: string,
        tokenType: string,
        id?: string,
        userData?: any,
    }

    export interface IPagination {
        page?: number,
        // skip?: number
    }
}