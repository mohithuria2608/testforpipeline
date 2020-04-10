import * as config from "config"
import * as Constant from '../../constant'
import { consolelog, topicNameCreator } from '../../utils'
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
                    await this.userhandler(payload)
                    break;
                }
                case Constant.SET_NAME.ADDRESS: {
                    await this.addresshandler(payload)
                    break;
                }
                case Constant.SET_NAME.MENU_EN: case Constant.SET_NAME.MENU_AR: {
                    await this.menuhandler(payload)
                    break;
                }
                case Constant.SET_NAME.HOME_EN: case Constant.SET_NAME.HOME_AR: {
                    await this.homehandler(payload)
                    break;
                }
                case Constant.SET_NAME.LOCATION: {
                    await this.locationhandler(payload)
                    break;
                }
                case Constant.SET_NAME.HIDDEN_EN: case Constant.SET_NAME.HIDDEN_AR: {
                    await this.hiddenhandler(payload)
                    break;
                }
                case Constant.SET_NAME.PROMOTION: {
                    await this.promotionhandler(payload)
                    break;
                }
                case Constant.SET_NAME.ORDER: {
                    await this.orderhandler(payload)
                    break;
                }
                case Constant.SET_NAME.CONFIG: {
                    await this.confighandler(payload)
                    break;
                }
                case Constant.SET_NAME.APP_VERSION: {
                    await this.appversionhandler(payload)
                    break;
                }
                case Constant.SET_NAME.LOGGER: {
                    await this.loggerhandler(payload)
                    break;
                }
                case Constant.SET_NAME.STORE: {
                    await this.storehandler(payload)
                    break;
                }
                case Constant.SET_NAME.PING_SERVICE: {
                    this.pinghandler(payload)
                    break;
                }
                case Constant.SET_NAME.SYNC_QUEUE: {
                    let messages = null;
                    let topic = null;
                    let partition = 0;
                    if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                        messages = { ...payload }
                        delete messages.sdm;
                        delete messages.as;
                        delete messages.mdb;
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.CONF.KAFKA.CMS.SYNC.MAX_RETRY.CREATE : Constant.CONF.KAFKA.CMS.SYNC.MAX_RETRY.UPDATE
                        topic = config.get("env") + "_" + Constant.KAFKA_TOPIC.SYNC_Q
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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

    async produceToRetryTopics(topic, messages, partition) {
        try {
            switch (messages.count) {
                case 1: {
                    console.log("----------------1 Try----------------", messages.count)
                    break;
                }
                case 2: {
                    console.log("----------------1 Re-Try----------------", messages.count)
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.RETRY1)
                    break;
                }
                case 3: {
                    console.log("----------------2 Re-Try----------------", messages.count)
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.RETRY2)
                    break;
                }
                case 4: {
                    console.log("----------------3 Re-Try----------------", messages.count)
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.RETRY3)
                    break;
                }
                default: {
                    return
                }
            }
            kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition })
            return
        } catch (error) {
            consolelog(process.cwd(), "produceToRetryTopics", JSON.stringify(error), false)
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
                topic: topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.FAIL_Q),
                partition: 0,
            });
            return {}
        } catch (error) {
            consolelog(process.cwd(), "produceToFailureTopic", JSON.stringify(error), false)
            return Promise.reject(error)
        }

    }

    async userhandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                messages = { ...payload }
                delete messages.as
                delete messages.sdm
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_USER)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.CMS_USER
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await userService.sync(messages)
                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset || payload.sdm.sync)) {
                messages = { ...payload }
                delete messages.as
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.SDM_USER)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.SDM_USER
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await userService.sync(messages)
                }
            }
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_USER)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_USER
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await userService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "userhandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async addresshandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                messages = { ...payload }
                delete messages.as
                delete messages.sdm
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_ADDRESS)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.CMS_ADDRESS
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await userService.sync(messages)
                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset || payload.sdm.sync)) {
                messages = { ...payload }
                delete messages.as
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.SDM_ADDRESS)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.SDM_ADDRESS
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await userService.sync(messages)
                }
            }
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_ADDRESS)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_ADDRESS
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await userService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "addresshandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async menuhandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                messages = { ...payload }
                delete messages.as
                delete messages.sdm
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_MENU)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.CMS_MENU
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await menuService.sync(messages)
                }
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset || payload.sdm.sync)) {
                messages = { ...payload }
                delete messages.as
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.SDM_MENU)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.SDM_MENU
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await menuService.sync(messages)
                }
            }
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_MENU)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_MENU
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await menuService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "menuhandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async homehandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_HOME)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_HOME
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await homeService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "homehandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async locationhandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null;
            let partition = 0;
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                messages = { ...payload }
                delete messages.sdm;
                delete messages.as;
                delete messages.mdb;
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_LOCATION)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.CMS_LOCATION
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await locationService.postLocationDataToCMS(messages)
                }
            }
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm;
                delete messages.cms;
                delete messages.mdb;
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_LOCATION)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_LOCATION
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else {
                        let messageArgv = JSON.parse(messages.as.argv);
                        switch (messageArgv.event) {
                            case "location_sync": await locationService.syncLocationFromCMS(messages); break;
                            case "store_status_sync": await locationService.syncStoreStatus(messages); break;
                        }
                    }
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "locationhandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async hiddenhandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_HIDDEN)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_HIDDEN
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await menuService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "hiddenhandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async promotionhandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_PROMOTION)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_PROMOTION
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await promotionService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "promotionhandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async orderhandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset || payload.sdm.sync)) {
                messages = { ...payload }
                delete messages.as
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.SDM_ORDER)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.SDM_ORDER
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await orderService.sync(messages)
                }
            }
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset || payload.cms.sync)) {
                messages = { ...payload }
                delete messages.as
                delete messages.sdm
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.CMS_ORDER)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.CMS_ORDER
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await orderService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "orderhandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async confighandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_CONFIG)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_CONFIG
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await syncService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "confighandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async appversionhandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.sdm
                delete messages.cms
                delete messages.mdb
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_APP_VERSION)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_APP_VERSION
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await syncService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "appversionhandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async loggerhandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.mdb && payload.mdb.create) {
                messages = { ...payload }
                delete messages.as
                delete messages.sdm
                delete messages.cms
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.M_LOGGER)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.M_LOGGER
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                    else
                        await logService.sync(messages)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "loggerhandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async storehandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.mdb
                delete messages.sdm
                delete messages.cms
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.AS_STORE)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.AS_STORE
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
                }
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "storehandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async pinghandler(payload: IKafkaRequest.IKafkaBody) {
        try {
            let messages = null;
            let topic = null
            let partition = 0
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset || payload.as.sync)) {
                messages = { ...payload }
                delete messages.mdb
                delete messages.sdm
                delete messages.cms
                if (payload.count >= 0) {
                    messages['count'] = (payload.count == 0) ? 1 : payload.count
                    topic = topicNameCreator(config.get("env"), Constant.KAFKA_TOPIC.PING_SERVICE)
                    messages['q'] = topic
                    messages['mainTopic'] = Constant.KAFKA_TOPIC.PING_SERVICE
                    if (payload.inQ)
                        this.produceToRetryTopics(topic, messages, partition)
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
            }
            return
        } catch (error) {
            consolelog(process.cwd(), "pinghandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const kafkaController = new KafkaController();