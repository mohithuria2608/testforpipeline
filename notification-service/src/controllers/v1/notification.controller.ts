import { smsLib, emailLib } from '../../lib'
import * as Constant from "../../constant";
import * as ejs from "ejs";
import * as moment from "moment";
import { consolelog } from '../../utils'

export class NotificationController {

    constructor() { }

    /**
     * @description : sends notification based on params
     */
    async sendNotification(payload: INotificationRequest.INotification) {
        return new Promise(async (resolve, reject) => {
            try {
                let payloadData = JSON.parse(payload.payload);
                if (payload.toSendMsg) {
                    await smsLib.sendSMS({
                        message: Constant.NOTIFICATION_MSG.SMS[payload.language][payload.msgCode](payloadData.msg),
                        destination: payload.msgDestination
                    });
                }
                if (payload.toSendEmail) {
                    payloadData.email.meta = { ...Constant.EMAIL_META, ...payloadData.email.meta };
                    payloadData.email.moment = moment;
                    ejs.renderFile(`${__dirname}/../../../templates/${payload.language}/${payload.emailCode.toLowerCase()}.ejs`, payloadData.email, {}, function (err, emailer) {
                        if (err) reject(err);
                        else {
                            emailLib.sendEmail({
                                message: emailer,
                                destination: payload.emailDestination,
                                subject: Constant.NOTIFICATION_MSG.EMAIL[payload.language][payload.emailCode],
                                isFailureEmail: payload.emailCode === Constant.NOTIFICATION_CODE.EMAIL.ORDER_FAIL
                            });
                            resolve();
                        }
                    });
                }
            } catch (err) {
                consolelog(process.cwd(), "sendNotification", err, false);
                resolve();
            }
        });
    }
}

export const notificationController = new NotificationController();