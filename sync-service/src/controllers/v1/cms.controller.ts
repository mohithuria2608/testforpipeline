import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class CmsController {

    constructor() { }

    /**
     * @method POST
     * @param {string} username
     * @param {string} password
     * */
    async auth(headers: ICommonRequest.IHeaders, payload: ICmsRequest.ICmsAuth) {
        try {
            let tokens = await ENTITY.CmsE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.CMS_AUTH],
                undefined,
                { username: payload.username, password: payload.password }
            )
            return { accessToken: tokens.accessToken }
        } catch (error) {
            consolelog(process.cwd(), "auth", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const cmsController = new CmsController();