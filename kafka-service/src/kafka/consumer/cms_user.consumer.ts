import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class CmsUserConsumer extends BaseConsumer {

    constructor() {
        super(Constant.KAFKA_TOPIC.CMS_USER, 'client');
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IUserGrpcRequest.ISyncToCMSUserData) => {
                consolelog(process.cwd(), "consumer cms_user", JSON.stringify(message), true)
                this.sendUserToCMSGrpc(message);
            })
    }

    private async sendUserToCMSGrpc(message: IUserGrpcRequest.ISyncToCMSUserData) {
        try {
            let res = await userService.createUserOnCms(message)
            return res
        } catch (err) {
            consolelog(process.cwd(), "sendUserToCMSGrpc", err, false);
            kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const cms_userConsumerE = new CmsUserConsumer();