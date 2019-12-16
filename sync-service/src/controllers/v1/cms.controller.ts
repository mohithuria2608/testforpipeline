import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

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
}

export const cmsController = new CmsController();