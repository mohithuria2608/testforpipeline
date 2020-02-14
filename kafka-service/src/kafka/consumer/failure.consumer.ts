import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"

class FailConsumer extends BaseConsumer {

    constructor() {
        super(process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.FAIL_Q, process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.FAIL_Q);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                consolelog(process.cwd(), "consumer failed_messages", message, true)
                this.handleFailReq(message);
            })
    }

    private async handleFailReq(message) {
        try {
            consolelog(process.cwd(), "Data in fail queue", message, true)
        } catch (error) {
            consolelog(process.cwd(), `handleFailReq`, JSON.stringify(error), false);
            return Promise.reject(error)
        }
    }
}


export const failConsumerE = new FailConsumer();