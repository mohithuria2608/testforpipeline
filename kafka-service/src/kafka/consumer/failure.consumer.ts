import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator, generateRandomString } from "../../utils"
import { kafkaController } from '../../controllers'

const topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.FAIL_Q)
const groupId = generateRandomString(16)

class FailConsumer extends BaseConsumer {

    constructor() {
         super(topic, groupId);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                consolelog(process.cwd(), "consumer fail_q", message, true)
                this.handleFailReq(message);
            })
    }

    async handleFailReq(message) {
        try {
            consolelog(process.cwd(), "Data in fail queue", message, true)
            let data: ICommonRequest.IActivityLogger = {
                type: Constant.DATABASE.TYPE.ACTIVITY_LOG.FAIL_Q,
                info: {
                    'request': message,
                },
                description: "",
                options: {
                    env: Constant.SERVER.ENV[config.get("env")],

                },
                createdAt: new Date().getTime(),
            }
            kafkaController.kafkaSync({
                set: Constant.SET_NAME.LOGGER,
                mdb: {
                    create: true,
                    argv: JSON.stringify(data)
                },
                inQ: true
            })
            return {}
        } catch (error) {
            consolelog(process.cwd(), `handleFailReq`, JSON.stringify(error), false);
            return Promise.reject(error)
        }
    }
}


export const failConsumerE = new FailConsumer();