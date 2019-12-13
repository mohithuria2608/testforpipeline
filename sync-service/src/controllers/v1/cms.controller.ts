import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { requestLib } from '../../lib'
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
            consolelog("auth", err, false)
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
            let res = await requestLib.request("POST", "http://40.123.205.1/rest/default/V1/customers/", { Authorization: "bearer" + "4ujubvvy7m0wj3bf7ws56hgvbptverw0" }, payloadForCms)
            console.log(res)
            return {
                id: res['id'],
                aerospikeId: payload.aerospikeId
            }
        } catch (err) {
            consolelog("createUserOnCms", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsController = new CmsController();