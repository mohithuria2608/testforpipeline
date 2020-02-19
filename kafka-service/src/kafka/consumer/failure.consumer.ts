import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { kafkaController } from '../../controllers'
const topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.FAIL_Q

class FailConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                consolelog(process.cwd(), "consumer fail_q", message, true)
                this.handleFailReq(message);
            })
    }

    private async handleFailReq(message) {
        try {
            consolelog(process.cwd(), "Data in fail queue", message, true)
            let data: ICommonRequest.IActivityLogger = {
                type: Constant.DATABASE.TYPE.ACTIVITY_LOG.FAIL_Q,
                info: {
                    'request': message
                },
                description: "",
                options: {
                    env: Constant.SERVER.ENV[config.get("env")],

                },
                createdAt: new Date().getTime(),
            }
            let dataToSave = {
                set: Constant.SET_NAME.LOGGER,
                mdb: {
                    create: true,
                    argv: JSON.stringify(data)
                }
            }
            kafkaController.kafkaSync(dataToSave)
            return {}
        } catch (error) {
            consolelog(process.cwd(), `handleFailReq`, JSON.stringify(error), false);
            return Promise.reject(error)
        }
    }
}


export const failConsumerE = new FailConsumer();