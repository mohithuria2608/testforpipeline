import { sms } from "../lib"

export let bootstrap = async function (server) {
    sms.sendSMS({
        message: 'Testing Message',
        destination: encodeURIComponent('+919999479907'),
        dlr: 0,
        type: 0
    })
    return {}
}