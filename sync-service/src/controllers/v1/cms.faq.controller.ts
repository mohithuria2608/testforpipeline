import * as Constant from '../../constant'
import { consolelog, generateFaqId } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService } from '../../grpc/client'

export class CmsFaqController {

    constructor() { }

    /**
   * @method GRPC
   */
    async syncFaqFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data: ICmsFaqRequest.ICmsFaq = JSON.parse(payload.as.argv)
            if (payload.as && (payload.as.create || payload.as.update || payload.as.reset || payload.as.get)) {
                if (payload.as.reset) {
                    if (data.data && data.data.length > 0) {
                        data.data.map(async faq => {
                            faq['id'] = generateFaqId(data.language, data.country)
                            let putArg: IAerospike.Put = {
                                bins: faq,
                                set: ENTITY.FaqE.set,
                                key: faq['id'],
                                createOrReplace: true,
                            }
                            await Aerospike.put(putArg)
                        })
                        let pingServices: IKafkaGrpcRequest.IKafkaBody = {
                            set: Constant.SET_NAME.PING_SERVICE,
                            as: {
                                create: true,
                                argv: JSON.stringify({
                                    set: Constant.SET_NAME.FAQ,
                                    service: [
                                        Constant.MICROSERVICE.USER
                                    ],
                                    language: data.language,
                                    country: data.country
                                })
                            },
                            inQ: true
                        }
                        kafkaService.kafkaSync(pingServices)
                    } else {
                        return Promise.reject("Unhandled error while saving faqs from cms")
                    }
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFaqFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {any} payload
     * @description creates a faq from CMS to aerospike
     */
    async postFaq(headers: ICommonRequest.IHeaders, payload: ICmsFaqRequest.ICmsFaq) {
        try {
            let faqChange: IKafkaGrpcRequest.IKafkaBody = {
                set: ENTITY.FaqE.set,
                as: {
                    reset: true,
                    argv: JSON.stringify(payload)
                },
                inQ: true
            }
            kafkaService.kafkaSync(faqChange)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postFaq", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {string} country
     * @param {number} language
     * @description Get faq from as 
     */
    async getFaq(payload: IFaqRequest.IFetchFaq) {
        try {
            let faq = await ENTITY.FaqE.getFaq(payload)
            return faq
        } catch (error) {
            consolelog(process.cwd(), "getFaq", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsFaqController = new CmsFaqController();