import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"

class FailConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.FAIL_Q, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                console.log("consumer failed_messages ", message)
                this.handleFailReq(message);
            })
    }

    private async handleFailReq(message) {
        try {
            console.log("Data in fail queue", message)
        } catch (err) {
            consolelog(`handleFailReq`, err, false);
            return Promise.reject(err)
        }
    }
}


export const failConsumerE = new FailConsumer();