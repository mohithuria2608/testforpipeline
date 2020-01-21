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
        isGuest: number,
        authCred?: IAuthCred
        sessionTime: number
    }

    interface IAuthCred {
        username: string,
        password: string
    }


    interface IPagination {
        page?: number,
    }

    interface IError {
        statusCode: number,
        httpCode: number,
        type: string,
        message: string
    }
    interface IActivityLogger {
        type: string,
        info: any,
        description: string,
        options: {
            env: number,
        },
        createdAt: number
    }
}