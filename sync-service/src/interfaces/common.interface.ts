declare namespace ICommonRequest {

    export interface IHeaders {
        country: string,
        appversion: string,
        devicetype: string,
        deviceid: string,
    }

    export interface AuthorizationObj {
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


    export interface IPagination {
        page?: number,
        // skip?: number
    }
}