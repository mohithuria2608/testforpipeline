import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { syncService, userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class UserConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.NEW_USER, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                console.log("consumer new_user message", message)
                this.sendUserToCMSGrpc(message);
            })
    }

    private async sendUserToCMSGrpc(message: IUserGrpcRequest.ICreateUserData) {
        try {
            let res = await syncService.syncUser(message)
            await userService.updateCmsId({ aerospikeId: message.aerospikeId, id: res.id })
            console.log("final response from cms for the user created", res)
            return res
        } catch (err) {
            consolelog(`sendUserToCMSGrpc`, err, false);
            kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const userConsumerE = new UserConsumer();