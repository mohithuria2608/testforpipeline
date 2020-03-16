import * as ejs from "ejs";
import { emailLib } from "../lib";

export let bootstrap = async function (server) {

    // ejs.renderFile(`${__dirname}/../../templates/user_welcome_email.ejs`, {}, {}, function (err, emailer) {
    //     if (err) console.log(err);
    //     emailLib.sendEmail({
    //         message: emailer,
    //         destination: 'abhishek.pathak@appinventiv.com',
    //         subject: 'Test EJS Message'
    //     });
    // });

    return {}
}