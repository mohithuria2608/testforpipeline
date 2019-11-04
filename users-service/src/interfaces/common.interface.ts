declare namespace ICommonRequest {

    export interface IHeaders {
        language: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
    }

    export interface IPagination {
        page?: number,
        // skip?: number
    }
}