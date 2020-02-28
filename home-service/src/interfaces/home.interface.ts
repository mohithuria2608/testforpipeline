declare namespace IHomeRequest {

    interface Home {
        id: number,
        language: string,
        sequence: number,
        widgetType: string,
        title: string,
        status: number,
        ctaAction: ctaAction
        media: media[],
        products: products[],
        content: string
    }

    interface ctaAction {
        title?: string,
        id?: number,
        type?: string,
        delimeters?: string,
    }
    interface media {
        sequence: number,
        mediaUrl: string,
        mediaType: string,
        extension: string,
        theme: string,
        bgColorCode: string,
        action: action
    }
    interface products {
        sequence: number,
        action: action
    }

    interface action {
        id: number,
        type: string,
        delimeters: string
    }

    interface IFetchHome {
        countryId: number
    }
}
