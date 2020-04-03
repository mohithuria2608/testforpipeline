import * as config from "config"
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { kafkaProducerE } from '../../kafka'
import { userService, menuService, promotionService, orderService, syncService, logService, locationService, paymentService, homeService } from "../../grpc/client"

export class KafkaController {

    constructor() { }

    /**
    * @method GRPC
    * @param {string} set
    * @param {IChangeAerospike=} as
    * @param {IChangeCMS=} cms
    * @param {IChangeSDM=} sdm
    * @param {number=} count
    * */
    async kafkaSync(payload: IKafkaRequest.IKafkaBody) {
        try {
            switch (payload.set) {
                case Constant.SET_NAME.USER: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        delete messages.mdb
                        if (messages.count == 0) {
                            if (payload.cms.create)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.USER.MAX_RETRY.CREATE
                            else if (payload.cms.get)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.USER.MAX_RETRY.GET
                            else if (payload.cms.update)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.USER.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_USER
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await userService.sync(messages)
                    }
                    if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset || payload.sdm.sync)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        delete messages.mdb
                        if (messages.count == 0) {
                            if (payload.sdm.create)
                                messages['count'] = Constant.DATABASE.KAFKA.SDM.USER.MAX_RETRY.CREATE
                            else if (payload.sdm.get)
                                messages['count'] = Constant.DATABASE.KAFKA.SDM.USER.MAX_RETRY.GET
                            else if (payload.sdm.update)
                                messages['count'] = Constant.DATABASE.KAFKA.SDM.USER.MAX_RETRY.UPDATE
                            else if (payload.sdm.sync)
                                messages['count'] = Constant.DATABASE.KAFKA.SDM.USER.MAX_RETRY.SYNC
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.SDM_USER
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await userService.sync(messages)
                    }
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.as.create)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.USER.MAX_RETRY.CREATE
                            else if (payload.as.get)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.USER.MAX_RETRY.GET
                            else if (payload.as.update)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.USER.MAX_RETRY.UPDATE
                            else if (payload.as.sync)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.USER.MAX_RETRY.SYNC
                            else
                                messages['count'] = 1
                        }
                        else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_USER
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await userService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.ADDRESS: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.cms.create)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.ADDRESS.MAX_RETRY.CREATE
                            else if (payload.cms.get)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.ADDRESS.MAX_RETRY.GET
                            else if (payload.cms.update)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.ADDRESS.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_ADDRESS
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await userService.sync(messages)
                    }
                    if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset || payload.sdm.sync)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            // if (payload.sdm.create)
                            //     messages['count'] = Constant.DATABASE.KAFKA.SDM.ADDRESS.MAX_RETRY.CREATE
                            // else if (payload.sdm.get)
                            //     messages['count'] = Constant.DATABASE.KAFKA.SDM.ADDRESS.MAX_RETRY.GET
                            // else if (payload.sdm.update)
                            //     messages['count'] = Constant.DATABASE.KAFKA.SDM.ADDRESS.MAX_RETRY.UPDATE
                            // else
                            messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        console.log("payload['count']", payload.sdm.create, messages['count'])
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.SDM_ADDRESS
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await userService.sync(messages)
                    }
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.as.create)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.ADDRESS.MAX_RETRY.CREATE
                            else if (payload.as.get)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.ADDRESS.MAX_RETRY.GET
                            else if (payload.as.update)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.ADDRESS.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_ADDRESS
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await userService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.MENU_EN: case Constant.SET_NAME.MENU_AR: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.cms.create)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.MENU.MAX_RETRY.CREATE
                            else if (payload.cms.get)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.MENU.MAX_RETRY.GET
                            else if (payload.cms.update)
                                messages['count'] = Constant.DATABASE.KAFKA.CMS.MENU.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_MENU
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await menuService.sync(messages)
                    }
                    if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset || payload.sdm.sync)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.sdm.create)
                                messages['count'] = Constant.DATABASE.KAFKA.SDM.MENU.MAX_RETRY.CREATE
                            else if (payload.sdm.get)
                                messages['count'] = Constant.DATABASE.KAFKA.SDM.MENU.MAX_RETRY.GET
                            else if (payload.sdm.update)
                                messages['count'] = Constant.DATABASE.KAFKA.SDM.MENU.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.SDM_MENU
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await menuService.sync(messages)
                    }
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.as.create)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.CREATE
                            else if (payload.as.get)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.GET
                            else if (payload.as.update)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_MENU
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await menuService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.HOME_EN: case Constant.SET_NAME.HOME_AR: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.as.create ? Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.UPDATE
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_HOME
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await homeService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.LOCATION: {
                    let messages = null;
                    let topic = null;
                    let partition = 0;
                    if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                        messages = { ...payload }
                        delete messages.sdm;
                        delete messages.as;
                        delete messages.mdb;
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.UPDATE
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.CMS_LOCATION
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await locationService.postLocationDataToCMS(messages)
                    }
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm;
                        delete messages.cms;
                        delete messages.mdb;
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.as.create ? Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.UPDATE
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_LOCATION
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else {
                            let messageArgv = JSON.parse(messages.as.argv);
                            switch (messageArgv.event) {
                                case "location_sync": await locationService.syncLocationFromCMS(messages); break;
                                case "store_status_sync": await locationService.syncStoreStatus(messages); break;
                            }
                        }
                    }
                    break;
                }
                case Constant.SET_NAME.HIDDEN_EN: case Constant.SET_NAME.HIDDEN_AR: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.as.create)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.HIDDEN.MAX_RETRY.CREATE
                            else if (payload.as.get)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.HIDDEN.MAX_RETRY.GET
                            else if (payload.as.update)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.HIDDEN.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_HIDDEN
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await menuService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.PROMOTION: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.as.create)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.CREATE
                            else if (payload.as.get)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.GET
                            else if (payload.as.update)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_PROMOTION
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await promotionService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.ORDER: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset || payload.sdm.sync)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count = 0) {
                            if (payload.sdm.create)
                                messages['count'] = Constant.DATABASE.KAFKA.SDM.ORDER.MAX_RETRY.CREATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.SDM_ORDER
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await orderService.sync(messages)

                    }
                    break;
                }
                case Constant.SET_NAME.CONFIG: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.as.create) {
                                messages['count'] = Constant.DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.CREATE
                            }
                            else if (payload.as.reset) {
                                messages['count'] = Constant.DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.RESET
                            }
                            else if (payload.as.update) {
                                messages['count'] = Constant.DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.UPDATE
                            }
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_CONFIG
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await syncService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.APP_VERSION: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (payload.count == 0) {
                            if (payload.as.create) {
                                messages['count'] = Constant.DATABASE.KAFKA.AS.APP_VERSION.MAX_RETRY.CREATE
                            }
                            else if (payload.as.reset) {
                                messages['count'] = Constant.DATABASE.KAFKA.AS.APP_VERSION.MAX_RETRY.RESET
                            }
                            else if (payload.as.update) {
                                messages['count'] = Constant.DATABASE.KAFKA.AS.APP_VERSION.MAX_RETRY.UPDATE
                            }
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_APP_VERSION
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await syncService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.LOGGER: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.mdb && payload.mdb.create) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        delete messages.cms
                        messages['count'] = 1
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.M_LOGGER
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else
                            await logService.sync(messages)
                    }
                    break;
                }
                case Constant.SET_NAME.STORE: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.mdb
                        delete messages.sdm
                        delete messages.cms
                        messages['count'] = 1
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.AS_STORE;
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.PING_SERVICE: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                        messages = { ...payload }
                        delete messages.mdb
                        delete messages.sdm
                        delete messages.cms
                        messages['count'] = 1
                        topic =config.get("env") + "_" + Constant.KAFKA_TOPIC.PING_SERVICE;
                        messages['q'] = topic
                        if (payload.inQ)
                            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                        else {
                            let data: ICommonRequest.IPingService = JSON.parse(messages.as.argv)
                            if (data.service && data.service.length > 0) {
                                data.service.map(service => {
                                    switch (service) {
                                        case Constant.MICROSERVICE.PAYMENT: {
                                            paymentService.sync(messages)
                                            break;
                                        }
                                        case Constant.MICROSERVICE.ORDER: {
                                            orderService.sync(messages)
                                            break;
                                        }
                                        case Constant.MICROSERVICE.USER: {
                                            userService.sync(messages)
                                            break;
                                        }
                                    }
                                })
                            }
                        }
                    }
                    break;
                }
            }
            return { data: 'success' };
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method KAFKA
     * @description : In case of failure of consumer produce data in failure topic (UNIVERSAL)
     * */
    async produceToFailureTopic(payload: any) {
        try {
            consolelog(process.cwd(), "produce data in failed KAFKA q", payload, true)
            kafkaProducerE.sendMessage({
                messages: JSON.stringify(payload),
                topic:config.get("env") + "_" + Constant.KAFKA_TOPIC.FAIL_Q,
                partition: 0,
            });
            return {}
        } catch (error) {
            consolelog(process.cwd(), "produceToFailureTopic", JSON.stringify(error), false)
            return Promise.reject(error)
        }

    }
}

export const kafkaController = new KafkaController();