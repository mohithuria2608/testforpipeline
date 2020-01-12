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
                    if (payload.cms.create || payload.cms.update) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.CMS.USER.MAX_RETRY.CREATE : Constant.KAFKA.CMS.USER.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.CMS_USER
                    }
                    if (payload.sdm.create || payload.sdm.update) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.SDM.USER.MAX_RETRY.CREATE : Constant.KAFKA.SDM.USER.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.SDM_USER
                    }
                    if (payload.as.create || payload.as.update) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.AS.USER.MAX_RETRY.CREATE : Constant.KAFKA.AS.USER.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.AS_USER
                    }

                    kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    break;
                }
                case Constant.SET_NAME.MENU: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.cms.create || payload.cms.update) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.sdm
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.CMS.MENU.MAX_RETRY.CREATE : Constant.KAFKA.CMS.MENU.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.CMS_MENU
                    }
                    if (payload.sdm.create || payload.sdm.update) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.SDM.MENU.MAX_RETRY.CREATE : Constant.KAFKA.SDM.MENU.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.SDM_MENU
                    }
                    if (payload.as.create || payload.as.update) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.AS.MENU.MAX_RETRY.CREATE : Constant.KAFKA.AS.MENU.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.AS_MENU
                    }

                    kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    break;
                }
                case Constant.SET_NAME.UPSELL: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as.create || payload.as.update) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.AS.UPSELL.MAX_RETRY.CREATE : Constant.KAFKA.AS.UPSELL.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.AS_UPSELL
                    }

                    kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    break;
                }
                case Constant.SET_NAME.PROMOTION: {
                    let messages = null;
                    let topic = null
                    let partition = 0
                    if (payload.as.create || payload.as.update) {
                        messages = { ...payload }
                        delete messages.as
                        delete messages.cms
                        if (!payload.hasOwnProperty('count'))
                            payload['count'] = payload.cms.create ? Constant.KAFKA.AS.PROMOTION.MAX_RETRY.CREATE : Constant.KAFKA.AS.PROMOTION.MAX_RETRY.UPDATE
                        topic = Constant.KAFKA_TOPIC.AS_PROMOTION
                    }

                    kafkaProducerE.sendMessage({ messages: JSON.stringify(messages), topic: topic, partition: partition });
                    break;
                }
            }


            if (!payload.hasOwnProperty('count'))
                payload['count'] = Constant.KAFKA.CMS.USER.MAX_RETRY.CREATE



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
        } catch (err) {
            consolelog(process.cwd(), "produceToFailureTopic", err, false)
            return Promise.reject(err)
        }
    }
}

export const kafkaController = new KafkaController();