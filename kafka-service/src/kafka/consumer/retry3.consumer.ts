import * as config from "config"
import { BaseConsumer } from "./base.consumer";
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from "../../utils"
import { kafkaController } from '../../controllers'

import { as_configConsumerE } from './as_config.consumer';
import { as_appversionConsumerE } from './as_appversion.consumer';
import { cms_menuConsumerE } from './cms_menu.consumer';
import { sdm_menuConsumerE } from './sdm_menu.consumer';
import { as_menuConsumerE } from './as_menu.consumer';
import { as_homeConsumerE } from './as_home.consumer';
import { as_locationConsumerE } from './as_location.consumer';
import { as_hiddenConsumerE } from './as_hidden.consumer';
import { sdm_userConsumerE } from './sdm_user.consumer';
import { cms_userConsumerE } from './cms_user.consumer';
import { as_userConsumerE } from './as_user.consumer';
import { sdm_addressConsumerE } from './sdm_address.consumer';
import { cms_addressConsumerE } from './cms_address.consumer';
import { as_addressConsumerE } from './as_address.consumer';
import { as_promotionConsumerE } from './as_promotion.consumer';
import { sdm_orderConsumerE } from './sdm_order.consumer';
import { cms_orderConsumerE } from './cms_order.consumer';
import { cms_locationConsumerE } from './cms_location.consumer';
import { ping_serviceE } from './ping_service.consumer';
import { as_storeConsumerE } from "./as_store.consumer";


const topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.RETRY3)

class Retry3Consumer extends BaseConsumer {

    sleepTime = 7000
    constructor() {
        super(topic, topic);
    }

    handleMessage() {
        this.onMessage<any>().subscribe(
            (message: IKafkaRequest.IKafkaBody) => {
                consolelog(process.cwd(), "consumer retry3", JSON.stringify(message.mainTopic), true)
                this.thirdRetry(message)
                return null
            })
    }

    async thirdRetry(message: IKafkaRequest.IKafkaBody) {
        try {
            if (message.count == 4) {
                setTimeout(async () => {
                    switch (message.mainTopic) {
                        case Constant.KAFKA_TOPIC.SDM_MENU: {
                            await sdm_menuConsumerE.syncMenu(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.CMS_MENU: {
                            await cms_menuConsumerE.syncMenu(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_MENU: {
                            await as_menuConsumerE.syncMenu(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_HOME: {
                            await as_homeConsumerE.syncHomeData(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_HIDDEN: {
                            await as_hiddenConsumerE.syncHidden(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_LOCATION: {
                            let messageArgv = JSON.parse(message.as.argv);
                            switch (messageArgv.event) {
                                case "location_sync": as_locationConsumerE.syncLocationFromCMS(message); break;
                                case "store_status_sync": as_locationConsumerE.syncStoreStatus(message); break;
                            }
                            break;
                        };
                        case Constant.KAFKA_TOPIC.CMS_LOCATION: {
                            await cms_locationConsumerE.postLocationDataToCMS(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_STORE: {
                            await as_storeConsumerE.syncStores(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.SDM_USER: {
                            await sdm_userConsumerE.syncUser(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.CMS_USER: {
                            await cms_userConsumerE.syncUser(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_USER: {
                            await as_userConsumerE.syncUser(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.CMS_ADDRESS: {
                            await cms_addressConsumerE.syncAddress(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.SDM_ADDRESS: {
                            await sdm_addressConsumerE.syncAddress(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_ADDRESS: {
                            await as_addressConsumerE.syncAddress(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_PROMOTION: {
                            await as_promotionConsumerE.syncPromotion(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.SDM_ORDER: {
                            await sdm_orderConsumerE.sdmOrder(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.CMS_ORDER: {
                            await cms_orderConsumerE.cmsOrder(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_CONFIG: {
                            as_configConsumerE.syncConfig(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.AS_APP_VERSION: {
                            await as_appversionConsumerE.syncAppversion(message)
                            break;
                        };
                        case Constant.KAFKA_TOPIC.PING_SERVICE: {
                            await ping_serviceE.pingService(message)
                            break;
                        };
                        default: {
                            break;
                        }
                    }
                }, this.sleepTime)
            }
            else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "thirdRetry", JSON.stringify(error), false);
            return Promise.reject(error)
        }
    }
}


export const retry3ConsumerE = new Retry3Consumer();