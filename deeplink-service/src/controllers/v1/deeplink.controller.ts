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
            let res: DeeplinkRequest.IDeeplinkMapperRes
            const delimiter = payload.url.split('#')[1]
            const split = payload.url.split('#')[1].split("/").filter(obj => obj != "")

            const type = split[0]
            const id = split[1]




            // switch (payload.type) {
            //     case Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.HOME: {

            //         break;
            //     }
            //     case Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.CATEGORY: {

            //         break;
            //     }
            //     case Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.ITEM_DETAIL: {

            //         break;
            //     }
            //     default: {
            //         res['type'] = Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.HOME
            //         break;
            //     }
            // }
            return {
                type: type,
                action: Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.CATEGORY,
                id: id,
                delimiter: delimiter
            }
        } catch (error) {
            consolelog("deepLinkMapper", error, false)
            return Promise.reject(error)
        }
    }
}

export const deeplinkController = new DeeplinkController();