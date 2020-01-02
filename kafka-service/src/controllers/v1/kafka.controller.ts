import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { kafkaProducerE } from '../../kafka'

export class KafkaController {

    constructor() { }

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

    /**
     * @method GRPC
     * @param {object} sdm
     * */
    async syncToSdmUser(payload: IUserGrpcRequest.ISyncToSDMUserData) {
        try {
            consolelog(process.cwd(), "produce user to sync in sdm in KAFKA service", payload, true)
            if (!payload.hasOwnProperty('count'))
                payload['count'] = Constant.KAFKA.SDM.USER.MAX_RETRY.CREATE
            kafkaProducerE.sendMessage({
                messages: JSON.stringify(payload),
                topic: Constant.KAFKA_TOPIC.SDM_USER,
                partition: 0,
            });
            return {}
        } catch (err) {
            consolelog(process.cwd(), "syncToSdmUser", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GRPC
     * @param {string} aerospikeId
     * @param {string} lastname
     * @param {string} firstname
     * @param {string} email
     * @param {number} storeId
     * @param {number} websiteId
     * @param {string} password
     * */
    async syncToCmsUser(payload: IUserGrpcRequest.ISyncToCMSUserData) {
        try {
            consolelog(process.cwd(), "produce user to sync in cms in KAFKA service", payload, true)
            if (!payload.hasOwnProperty('count'))
                payload['count'] = Constant.KAFKA.CMS.USER.MAX_RETRY.CREATE
            kafkaProducerE.sendMessage({
                messages: JSON.stringify(payload),
                topic: Constant.KAFKA_TOPIC.CMS_USER,
                partition: 0,
            });
            return {}
        } catch (err) {
            consolelog(process.cwd(), "syncToCmsUser", err, false)
            return Promise.reject(err)
        }
    }
}

export const kafkaController = new KafkaController();