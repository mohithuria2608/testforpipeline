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
        id?: string,
    }

    interface IPagination {
        page?: number,
        // skip?: number
    }

    interface ICordinatesOpt {
        lat?: number,
        lng?: number
    }

    interface IError {
        statusCode: number,
        httpCode: number,
        type: string,
        message: string
    }

    interface IChange {
        create?: boolean,
        update?: boolean,
        name?: boolean,
        email?: boolean,
        phone?: boolean
    }
}