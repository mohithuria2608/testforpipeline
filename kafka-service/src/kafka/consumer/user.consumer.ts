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
                consolelog(process.cwd(), "consumer new_user", message, true)
                this.sendUserToCMSGrpc(message);
            })
    }

    private async sendUserToCMSGrpc(message: IUserGrpcRequest.ICreateUserData) {
        try {
            let res = await syncService.syncUser(message)
            await userService.updateCmsId({ aerospikeId: message.aerospikeId, id: res.id })
            return res
        } catch (err) {
            consolelog(process.cwd(), `sendUserToCMSGrpc`, err, false);
            kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const userConsumerE = new UserConsumer();