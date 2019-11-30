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
            let res = {}
            const delimiter = payload.url.split('#')[1]
            const split = payload.url.split('#')[1].split("/").filter(obj => obj != "")
            console.log("here........", split)
            const type = split[0] ? split[0] : Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.HOME
            const id = split[1] ? split[1] : ""

            switch (type) {
                case 'menu': {
                    res['type'] = 'menu'
                    res['action'] = Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.CATEGORY
                    res['id'] = id
                    res['delimiter'] = delimiter
                    break;
                }
                case 'customize': {
                    res['type'] = 'customize'
                    res['action'] = Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.ITEM_DETAIL
                    res['id'] = id
                    res['delimiter'] = delimiter
                    break;
                }
                default: {
                    res['type'] = 'home'
                    res['action'] = Constant.DATABASE.TYPE.DEEPLINK_REDIRECTION.HOME
                    res['id'] = id
                    res['delimiter'] = delimiter
                    break;
                }
            }
            return res
        } catch (error) {
            consolelog("deepLinkMapper", error, false)
            return Promise.reject(error)
        }
    }
}

export const deeplinkController = new DeeplinkController();