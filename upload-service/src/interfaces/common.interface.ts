declare namespace ICommonRequest {

    interface IHeaders {
        language: string,
        country: string,
        brand: string,
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
        id?: string,
        userData?: any,
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