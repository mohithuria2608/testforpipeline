declare namespace DeeplinkRequest {

    interface ICreateDeeplink {
        url: string,
        ios: string
    }

    interface IDeeplinkMapper extends ICommonRequest.IHeaders {
        type: string,
    }
}
