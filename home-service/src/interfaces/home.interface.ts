declare namespace IHomeRequest {

    interface Home {
        id: number,
        sequence?: number,
        widgetType?: string,
        title?: string,
        status?: number,
        ctaAction?: ctaAction
        media?: media[],
        products?: products[],
        mediaUrl?: string,
        content?: string,
        action?: action,
        extension?: string
    }

    interface ctaAction {
        title?: string,
        id?: number,
        type?: string,
        delimeters?: string,
    }
    interface media {
        sequence?: number,
        mediaUrl?: string,
        mediaType?: string,
        extension?: string,
        theme?: string,
        bgColorCode?: string,
        action?: {
            id?: number,
            type?: string,
            delimeters?: string
        }
    }
    interface products {
        sequence?: number,
        extension?: string,
        action?: {
            id?: number,
            type?: string,
            delimeters?: string
        }
    }

    interface action {
        id?: number,
        type?: string,
        delimeters?: string
    }
}
