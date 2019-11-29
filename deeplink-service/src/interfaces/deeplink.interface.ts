declare namespace DeeplinkRequest {

    interface ICreateDeeplink {
        path: string,
        // url: string,
        // ios: string
    }

    interface IDeeplinkMapper extends ICommonRequest.IHeaders {
        type: string,
    }

    interface IDeeplinkMapperRes {
        type:string,

    }
}
