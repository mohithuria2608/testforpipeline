import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog } from "../../utils"
import { userService, orderService, paymentService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.PING_SERVICE

class PingServiceConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                consolelog(process.cwd(), "consumer ping_service", JSON.stringify(message), true)
                this.pingService(message);
            })
    }

    private async pingService(message: IKafkaRequest.IKafkaBody) {
        try {
            let data: ICommonRequest.IPingService = JSON.parse(message.as.argv)
            if (data.service && data.service.length > 0) {
                data.service.map(service => {
                    switch (service) {
                        case Constant.MICROSERVICE.PAYMENT: {
                            paymentService.sync(message)
                            break;
                        }
                        case Constant.MICROSERVICE.ORDER: {
                            orderService.sync(message)
                            break;
                        }
                        case Constant.MICROSERVICE.USER: {
                            userService.sync(message)
                            break;
                        }
                    }
                })
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), `pingService`, JSON.stringify(error), false);
            if (message.count > 0) {
                message.count = message.count - 1
                if (message.count == 0)
                    kafkaController.produceToFailureTopic(message)
                else
                    kafkaController.kafkaSync(message)
            } else
                kafkaController.produceToFailureTopic(message)
            return Promise.reject(error)
        }
    }
}


export const ping_serviceE = new PingServiceConsumer();