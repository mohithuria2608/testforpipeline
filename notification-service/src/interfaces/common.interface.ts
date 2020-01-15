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
}