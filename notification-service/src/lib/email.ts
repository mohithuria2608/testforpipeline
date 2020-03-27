import * as config from 'config'
import { consolelog } from '../utils';
import * as sendGrid from "@sendgrid/mail";

export class EmailClass {

    constructor() {
        sendGrid.setApiKey(config.get("email.sgKey"))
    }

    sendEmail(payload: IEmailRequest.ISingleEmail) {
        try {
            sendGrid.send({
                to: payload.destination,
                from: config.get("email.sender"),
                subject: payload.subject,
                html: payload.message
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export const emailLib = new EmailClass(); 