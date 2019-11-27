import * as Constant from '../../constant'
import { templateLib } from '../../lib'

export class DeeplinkController {

    constructor() { }

    /**
    * @method GET
    * @param {string} url : android url with path params
    * @param {string} ios : ios url with path params
    * */
    async createDeepLink(payload: DeeplinkRequest.CreateDeeplink) {
        try {
            let option = {
                url: payload.url,
                iosLink: payload.ios,
                fallback: Constant.SERVER.DEEPLINK_FALLBACK,
                title: 'deeplink',
                android_package_name: Constant.SERVER.ANDROID_PACKAGE_NAME,
                ios_store_link: Constant.SERVER.IOS_SCHEME_HOST
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
}

export const deeplinkController = new DeeplinkController();