declare namespace INotificationRequest {

    interface INotification {
        toSendMsg?: boolean,
        toSendEmail?: boolean,
        msgCode?: string,
        emailCode?: string,
        msgDestination?: string,
        emailDestination?: string,
        language: string,
        payload: string
    }
}