import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { logService } from "../../grpc/client"
const topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.M_LOGGER

class MLoggerConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                this.logMessages(message);
            })
    }

    private async logMessages(message) {
        try {
            let res = await logService.sync(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), `logMessages`, JSON.stringify(error), false);
            return Promise.reject(error)
        }
    }
}


export const m_loggerE = new MLoggerConsumer();