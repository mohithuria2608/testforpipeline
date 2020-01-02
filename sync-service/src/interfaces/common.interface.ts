declare namespace ICommonRequest {

    interface IHeaders {
        country: string,
        appversion: string,
        devicetype: string,
        deviceid: string,
    }

    interface AuthorizationObj {
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


    interface IPagination {
        page?: number,
        // skip?: number
    }

    interface IError {
        statusCode: number,
        httpCode: number,
        type: string,
        message: string
    }
}