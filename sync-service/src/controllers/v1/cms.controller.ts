import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsController {

    constructor() { }

    /**
     * @method POST
     * */
    async auth(payload: ICmsRequest.ICmsAuth) {
        try {
            let tokens = await ENTITY.CmsE.getTokens(
                payload.deviceid,
                payload.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.CMS_AUTH],
                { username: payload.username, password: payload.password }
            )
            return { accessToken: tokens.accessToken }
        } catch (err) {
            consolelog("auth", err, false)
            return Promise.reject(err)
        }
    }
}

export const cmsController = new CmsController();