import * as config from 'config'
import { consolelog } from '../utils';
import * as nodemailer from "nodemailer";

export class EmailClass {

    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.get("email.smtp.host"),
            port: config.get("email.smtp.port"),
            secure: false,
            auth: {
                user: config.get("email.smtp.auth_user"),
                pass: config.get("email.smtp.auth_pass")
            }
        });
    }

    async sendEmail(payload: IEmailRequest.ISingleEmail) {
        try {
            if (process.env.NODE_ENV == "staging")
                return {}
            else {
                let emailResponse = await this.transporter.sendMail({
                    to: payload.destination,
                    from: config.get("email.sender"),
                    subject: payload.subject,
                    html: payload.message
                });
                consolelog(process.cwd(), 'sendEmail', JSON.stringify(emailResponse), true);
                return {}
            }
        } catch (err) {
            console.log("ERROR -> ", err);
            return Promise.reject(err)
        }
    }

    // @NOTE - SENDGRID email method, in future we could use sendgrid
    // import * as sendGrid from "@sendgrid/mail";
    // sendGrid.setApiKey(config.get("email.sgKey"))
    // async sendEmail(payload: IEmailRequest.ISingleEmail) {
    //     try {
    //         if (process.env.NODE_ENV == "staging")
    //             return {}
    //         else
    //             return await sendGrid.send({
    //                 to: payload.destination,
    //                 from: config.get("email.sender"),
    //                 subject: payload.subject,
    //                 html: payload.message
    //             });
    //     } catch (err) {
    //         console.log("ERROR -> ", JSON.stringify(err));
    //         return Promise.reject(err)
    //     }
    // }
}

export const emailLib = new EmailClass(); 