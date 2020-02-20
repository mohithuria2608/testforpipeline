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
        sessionTime: number
    }

    interface IPagination {
        page?: number,
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

    interface IReqPromiseOptions {
        method: string,
        url: string,
        body?: true
        form?: boolean,
        qs?: boolean,
        formData?: boolean
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

    interface IPingService {
        set: string,
        service: string[],
        store_code: string
    }
    interface ISDM {
        licenseCode: string,
        conceptID?: number,
        language: string,
    }
}