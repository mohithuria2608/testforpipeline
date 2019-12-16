declare namespace DeeplinkRequest {

    interface ICreateDeeplink {
        path: string,
        id: string,
        // url: string,
        // ios: string
    }

    interface IDeeplinkMapper {
        url: string,
    }

    // interface IDeeplinkMapperRes {
    //     type: string,
    //     action: string,
    //     id: string,
    //     delimiter: string
    // }
}
