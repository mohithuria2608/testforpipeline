import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { cmsRequestLib } from '../../lib'
export class CmsController {

    constructor() { }

    /**
     * @method POST
     * */
    async auth(headers: ICommonRequest.IHeaders, payload: ICmsRequest.ICmsAuth) {
        try {
            let tokens = await ENTITY.CmsE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.CMS_AUTH],
                { username: payload.username, password: payload.password }
            )
            return { accessToken: tokens.accessToken }
        } catch (err) {
            consolelog(process.cwd(),"auth", err, false)
            return Promise.reject(err)
        }
    }

    async createUserOnCms(payload: IKafkaGrpcRequest.ICreateUserData): Promise<IKafkaGrpcRequest.ICreateUserRes> {
        try {
            const payloadForCms = {
                customer: {
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    email: payload.email,
                    store_id: payload.storeId,
                    website_id: payload.websiteId,
                    addresses: []
                },
                password: payload.password
            }
            let res = await cmsRequestLib.createCostomer({}, payloadForCms)
            return {
                id: res['id'],
                aerospikeId: payload.aerospikeId
            }
        } catch (err) {
            consolelog(process.cwd(),"createUserOnCms", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsController = new CmsController();