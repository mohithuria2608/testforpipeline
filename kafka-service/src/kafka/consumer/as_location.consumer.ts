import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { locationService } from "../../grpc/client"
import { kafkaController } from '../../controllers'

class ASLocationConsumer extends BaseConsumer {

    constructor() {
        super(process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_LOCATION, topicNameCreator(config.get("env"),Constant.KAFKA_TOPIC.AS_LOCATION));
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer as_location", JSON.stringify(message), true)
                let messageArgv = JSON.parse(message.as.argv);
                switch (messageArgv.event) {
                    case "location_sync": this.syncLocationFromCMS(message); break;
                    case "store_status_sync": this.syncStoreStatus(message); break;
                }
                this.syncLocationFromCMS(message);
                return null;
            })
    }

    async syncLocationFromCMS(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await locationService.syncLocationFromCMS(message)
                return res
            } else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncLocationFromCMS", JSON.stringify(error), false);
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
            return {}
        }
    }

    async syncStoreStatus(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count > 0) {
                let res = await locationService.syncStoreStatus(message)
                return res
            } else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "syncStoreStatusToAS", JSON.stringify(error), false);
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
            return {}
        }
    }
}


export const as_locationConsumerE = new ASLocationConsumer();