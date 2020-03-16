declare namespace INotificationGrpcRequest {
    interface ISendNotification {
        toSendMsg?: boolean,
        toSendEmail?: boolean,
        msgCode?: string,
        emailCode?: string,
        msgDestination?: string,
        emailDestination?: string,
        language: string
    }

    interface ISendNotificationRes {

    }
}
