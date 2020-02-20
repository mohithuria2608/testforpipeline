import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { kafkaProducerE } from '../../kafka'

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
            console.log("in kafka : ", payload)
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_USER
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_USER
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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


                            messages['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.AS.USER.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.USER.MAX_RETRY.UPDATE
                        }
                        else if (payload.count < 0) {
                            break;
                        }
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_USER
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_ADDRESS
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_ADDRESS
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_ADDRESS
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.MENU: {
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_MENU
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_MENU
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_MENU
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.UPSELL: {
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
                                messages['count'] = Constant.DATABASE.KAFKA.AS.UPSELL.MAX_RETRY.CREATE
                            else if (payload.as.get)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.UPSELL.MAX_RETRY.GET
                            else if (payload.as.update)
                                messages['count'] = Constant.DATABASE.KAFKA.AS.UPSELL.MAX_RETRY.UPDATE
                            else
                                messages['count'] = 1
                        } else if (payload.count < 0) {
                            break;
                        }
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_UPSELL
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_PROMOTION
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_ORDER
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_CONFIG
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.M_LOGGER
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_STORE;
                        messages['q'] = topic
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
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.PING_SERVICE;
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.cms && payload.cms.create) {
                        messages = { ...payload }
                        delete messages.mdb
                        delete messages.sdm
                        delete messages.as
                        topic = Constant.KAFKA_TOPIC.CMS_LOCATION;
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

    /**
     * @method KAFKA
     * @description : In case of failure of consumer produce data in failure topic (UNIVERSAL)
     * */
    async produceToFailureTopic(payload: any) {
        try {
            consolelog(process.cwd(), "produce data in failed KAFKA q", payload, true)
            kafkaProducerE.sendMessage({
                messages: JSON.stringify(payload),
                topic: process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.FAIL_Q,
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