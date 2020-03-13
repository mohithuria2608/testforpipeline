import { smsLib, emailLib } from '../../lib'
import * as Constant from "../../constant";

export class NotificationController {

    constructor() { }

    /**
     * @description : sends notification based on params
     */
    async sendNotification(payload: INotificationRequest.INotification) {
        if (payload.toSendMsg) {
            smsLib.sendSMS({
                message: Constant.SMS_MSG[payload.language][payload.msgCode],
                destination: payload.msgDestination
            });
        }
        if (payload.toSendEmail) {
            emailLib.sendEmail({
                message: 'KFC EMAIL TEST',
                destination: payload.emailDestination,
                subject: 'Test Subject'
            });
        }
    }

}

export const notificationController = new NotificationController();