import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class SdmUserConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.SDM_USER, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IUserGrpcRequest.ISyncToSDMUserData) => {
                consolelog(process.cwd(), "consumer sdm_user", JSON.stringify(message), true)
                this.sendUserToSDMGrpc(message);
            })
    }

    private async sendUserToSDMGrpc(message: IUserGrpcRequest.ISyncToSDMUserData) {
        try {
            let res = await userService.createUserOnSdm(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "sendUserToSDMGrpc", err, false);
            kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const sdm_userConsumerE = new SdmUserConsumer();