import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { userService, orderService, paymentService, promotionService, menuService, homeService, locationService, deeplinkService } from "../../grpc/client"
import { kafkaController } from '../../controllers'
const topic = topicNameCreator(config.get("env"),Constant.KAFKA_TOPIC.PING_SERVICE)

class PingServiceConsumer extends BaseConsumer {

    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: any) => {
                consolelog(process.cwd(), "consumer ping_service", "", true)
                this.pingService(message);
            })
    }

    async pingService(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
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
                            case Constant.MICROSERVICE.DEEPLINK: {
                                deeplinkService.sync(message)
                                break;
                            }
                            case Constant.MICROSERVICE.HOME: {
                                homeService.sync(message)
                                break;
                            }
                            case Constant.MICROSERVICE.LOCATION: {
                                locationService.sync(message)
                                break;
                            }
                            case Constant.MICROSERVICE.MENU: {
                                menuService.sync(message)
                                break;
                            }
                            case Constant.MICROSERVICE.PROMOTION: {
                                promotionService.sync(message)
                                break;
                            }
                        }
                    })
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), `pingService`, JSON.stringify(error), false);
            switch (message.count) {
                case 1:
                case 2:
                case 3: {
                    message.count = message.count + 1
                    kafkaController.kafkaSync(message)
                    break;
                }
                default: {
                    message.error = JSON.stringify(error)
                    kafkaController.produceToFailureTopic(message)
                    break;
                }
            }
            return Promise.reject(error)
        }
    }
}


export const ping_serviceE = new PingServiceConsumer();