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
}