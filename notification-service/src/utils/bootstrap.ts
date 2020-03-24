import * as ejs from "ejs";
import { emailLib } from "../lib";
import { configuration } from '../configuration';

export let bootstrap = async function (server) {
    await configuration.init({ bootstrap: true });;
    // console.log(__dirname);
    // ejs.renderFile(`${__dirname}/../../templates/En/order_cancel_email.ejs`, { user: {}, meta: {} }, {}, function (err, emailer) {
    //     if (err) console.log("ERRROR -> ", err);
    //     else {
    //         fs.writeFileSync('welcome.html', emailer, {});
    //     }
    // })

    return {}
}