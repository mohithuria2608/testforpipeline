import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'

export class CmsConfigController {

    constructor() { }

    /**
    * @method GRPC
    */
    async syncConfigFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {
                    let dataToSave = {
                        type: data.type,
                        ...data.data
                    }
                    let putArg: IAerospike.Put = {
                        bins: dataToSave,
                        set: ENTITY.ConfigE.set,
                        key: dataToSave.id,
                        ttl: 0,
                        create: true,
                    }
                    await Aerospike.put(putArg)
                }
                if (payload.as.update) {
                    let configData = await ENTITY.ConfigE.getConfig({ type: data.type })
                    let dataToUpdate = {
                        type: data.type,
                        ...data.data
                    }
                    let putArg: IAerospike.Put = {
                        bins: dataToUpdate,
                        set: ENTITY.ConfigE.set,
                        key: configData.id,
                        update: true,
                    }
                    await Aerospike.put(putArg)
                }
                if (payload.as.get) {
                    await ENTITY.ConfigE.getConfig(data)
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncConfigFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * @param {any} payload
     * @description creates and saves a config from CMS to aerospike
     */
    async postConfig(headers: ICommonRequest.IHeaders, payload: ICmsConfigRequest.ICmsConfig) {
        try {
            let change = {
                set: ENTITY.ConfigE.set,
                as: {
                    create: true,
                    argv: JSON.stringify(payload.data)
                }
            }
            if (payload.action == "update") {
                change['as']['update'] = true
                delete change['as']['create']
            }

            ENTITY.ConfigE.syncToKafka(change)
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postConfig", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsConfigController = new CmsConfigController();