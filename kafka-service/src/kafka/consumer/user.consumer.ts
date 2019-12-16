import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import {  userService } from "../../grpc/client"
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

    private async sendUserToCMSGrpc(message: IUserGrpcRequest.ICreateUserDataOnCms) {
        try {
            let res = await userService.createUserOnCms(message) 
            return res
        } catch (err) {
            consolelog(process.cwd(), `sendUserToCMSGrpc`, err, false);
            kafkaController.produceToFailureTopic(message)
            return {}
        }
    }
}


export const userConsumerE = new UserConsumer();