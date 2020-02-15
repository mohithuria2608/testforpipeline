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
            switch (payload.set) {
                case Constant.SET_NAME.USER: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.CMS.USER.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.CMS.USER.MAX_RETRY.UPDATE
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_USER
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.SDM.USER.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.SDM.USER.MAX_RETRY.UPDATE
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_USER
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.AS.USER.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.USER.MAX_RETRY.UPDATE
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.AS_USER
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.MENU: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.reset)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.CMS.MENU.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.CMS.MENU.MAX_RETRY.UPDATE
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.CMS_MENU
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.SDM.MENU.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.SDM.MENU.MAX_RETRY.UPDATE
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.SDM_MENU
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.MENU.MAX_RETRY.UPDATE
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
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.AS.UPSELL.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.UPSELL.MAX_RETRY.UPDATE
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
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.as.create ? Constant.DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.PROMOTION.MAX_RETRY.UPDATE
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
                    if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.reset)) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        delete messages.mdb
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
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset)) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        delete messages.mdb
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.CREATE : Constant.DATABASE.KAFKA.AS.CONFIG.MAX_RETRY.UPDATE
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
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset)) {
                        messages = { ...payload }
                        delete messages.mdb
                        delete messages.sdm
                        delete messages.cms
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
                    if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.reset)) {
                        messages = { ...payload }
                        delete messages.mdb
                        delete messages.sdm
                        delete messages.cms
                        topic = process.env.NODE_ENV + "_" + Constant.KAFKA_TOPIC.PING_SERVICE;
                        messages['q'] = topic
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
            }
            return { data: 'succes' };
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