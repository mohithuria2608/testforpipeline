import * as Constant from '../../constant'
import { consolelog, generateFaqId } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class CmsFaqController {

    constructor() { }

    /**
     * @method POST
     * @param {any} payload
     * @description creates faq from CMS to aerospike
     */
    async postFaq(payload: ICmsFaqRequest.ICmsFaq) {
        try {
            payload.data.map(async faq => {
                if (faq.country == "AE")
                    faq.country = "UAE"
                faq['id'] = generateFaqId(faq.language, faq.country)
                let putArg: IAerospike.Put = {
                    bins: faq,
                    set: ENTITY.FaqE.set,
                    key: faq['id'],
                    createOrReplace: true,
                }
                await Aerospike.put(putArg)
            })
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