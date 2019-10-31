import * as Constant from '../../constant'
import { BaseConsumer } from "./base.consumer";
import { consolelog } from "../../utils"

class EntityConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.CREATE_TOKEN, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                this.createToken(message);
            })
    }

    private async createToken(message: any) {
        try {
            consolelog(`createToken`, message, true);
            return {}
        } catch (err) {
            consolelog(`createToken`, err, false);
            return Promise.reject(err)
        }
    }

}


export const entityConsumerE = new EntityConsumer();