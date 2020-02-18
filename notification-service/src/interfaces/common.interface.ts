declare namespace ICommonRequest {

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
    interface IPingService {
        set: string,
        service: string[],
        store_code: string
    }
}