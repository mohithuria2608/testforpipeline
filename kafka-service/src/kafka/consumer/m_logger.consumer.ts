import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { logService } from "../../grpc/client"

class MLoggerConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.M_LOGGER, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                consolelog(process.cwd(), "consumer m_logger", message, true)
                this.logMessages(message);
            })
    }

    private async logMessages(message) {
        try {
            let res = await logService.sync(message)
            return res
        } catch (error) {
            consolelog(process.cwd(), `logMessages`, error, false);
            return Promise.reject(error)
        }
    }
}


export const m_loggerE = new MLoggerConsumer();