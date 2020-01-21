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
            consolelog(process.cwd(), "produce data to sync with legacy systems in KAFKA service", JSON.stringify(payload), true)
            switch (payload.set) {
                case Constant.SET_NAME.USER: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.cms.create || payload.cms.update || payload.cms.get) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.CMS.USER.MAX_RETRY.CREATE : Constant.KAFKA.CMS.USER.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.CMS_USER
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.sdm.create || payload.sdm.update || payload.sdm.get) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.SDM.USER.MAX_RETRY.CREATE : Constant.KAFKA.SDM.USER.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.SDM_USER
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.as.create || payload.as.update || payload.as.get) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.AS.USER.MAX_RETRY.CREATE : Constant.KAFKA.AS.USER.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.AS_USER
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.MENU: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.cms.create || payload.cms.update || payload.cms.get) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.CMS.MENU.MAX_RETRY.CREATE : Constant.KAFKA.CMS.MENU.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.CMS_MENU
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.sdm.create || payload.sdm.update || payload.sdm.get) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.SDM.MENU.MAX_RETRY.CREATE : Constant.KAFKA.SDM.MENU.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.SDM_MENU
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    if (payload.as.create || payload.as.update || payload.as.get) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.AS.MENU.MAX_RETRY.CREATE : Constant.KAFKA.AS.MENU.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.AS_MENU
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.UPSELL: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as.create || payload.as.update || payload.as.get) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.AS.UPSELL.MAX_RETRY.CREATE : Constant.KAFKA.AS.UPSELL.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.AS_UPSELL
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.PROMOTION: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as.create || payload.as.update || payload.as.get) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.as.create ? Constant.KAFKA.AS.PROMOTION.MAX_RETRY.CREATE : Constant.KAFKA.AS.PROMOTION.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.AS_PROMOTION
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.ORDER: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.sdm.create || payload.sdm.update || payload.sdm.get) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        topic = Constant.KAFKA_TOPIC.SDM_ORDER
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.CONFIG: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as.create || payload.as.update || payload.as.get) {
                        messages = { ...payload }
                        delete messages.sdm
                        delete messages.cms
                        topic = Constant.KAFKA_TOPIC.AS_CONFIG
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
                case Constant.SET_NAME.LOGGER: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.mdb.create) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        delete messages.cms
                        topic = Constant.KAFKA_TOPIC.M_LOGGER
                        kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    }
                    break;
                }
            }
            return { data: '' };
        } catch (error) {
            consolelog(process.cwd(), "sync", error, false)
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
                topic: Constant.KAFKA_TOPIC.FAIL_Q,
                partition: 0,
            });
            return {}
        } catch (error) {
            consolelog(process.cwd(), "produceToFailureTopic", error, false)
            return Promise.reject(error)
        }

    }
}

export const kafkaController = new KafkaController();