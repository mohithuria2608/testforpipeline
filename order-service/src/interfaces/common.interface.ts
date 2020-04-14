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
        timezone: string,
        channel: string
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

    interface ICordinatesReq {
        lat: number,
        lng: number
    }

    interface ICordinatesOpt {
        lat?: number,
        lng?: number
    }

    interface IError {
        name?: string,
        statusCode: number,
        httpCode: number,
        type: string,
        message: string,
        message_Ar: string
        message_En: string
        actionHint?: string,
        useNoonPayMessage?: boolean;
        data?: any;
    }

    interface IReqPromiseOptions {
        method: string,
        url: string,
        body?: boolean
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
        store_code?: string,
        type?: string,
        language?: string,
        country?: string
        data?: ISyncGrpcRequest.IConfig
    }

    interface IInitConfiguration {
        store_code?: string,
        type?: string,
        bootstrap: boolean,
        country?: string
    }

    interface IGrpcHealthCheck {
        request: IGrpcHealthCheckReq
    }

    interface IGrpcHealthCheckReq {
        get: boolean
    }

    interface IGrpcHealthCheckRes {
        state: boolean
    }
}