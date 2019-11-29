import * as Constant from '../../constant'
import { templateLib } from '../../lib'
import { consolelog } from '../../utils'

export class DeeplinkController {

    constructor() { }

    /**
    * @method GET
    * @param {string} url : android url with path params
    * @param {string} ios : ios url with path params
    * */
    async createDeepLink(payload: DeeplinkRequest.ICreateDeeplink) {
        try {
            let option = {
                title: 'deeplink',
                android_package_name: Constant.SERVER.ANDROID_PACKAGE_NAME,
                url: Constant.SERVER.ANDROID_SCHEME_HOST + Constant.SERVER.ANDROID_PACKAGE_NAME,
                iosLink: Constant.SERVER.IOS_SCHEME_HOST,
                ios_store_link: Constant.SERVER.IOS_SCHEME_HOST,
                fallback: Constant.SERVER.DEEPLINK_FALLBACK
            }
            option['title'] = Constant.SERVER.APP_INFO.APP_NAME
            option['description'] = ''
            option['image'] = ''
            let content = await templateLib.compileFile(Constant.SERVER.TEMPLATE_PATH + 'deeplink.html', option)
            return (content)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * */
    async deepLinkMapper(payload: DeeplinkRequest.IDeeplinkMapper) {
        try {
            let res = {
                type: payload.type,

            }

            return res
        } catch (error) {
            consolelog("deepLinkMapper", error, false)
            return Promise.reject(error)
        }
    }
}

export const deeplinkController = new DeeplinkController();