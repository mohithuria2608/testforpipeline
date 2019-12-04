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
        id?: string,
        userData?: IUserServiceRequest.IUserData,
        authCred?: IAuthCred
    }

    interface IAuthCred {
        username: string,
        password: string
    }
}