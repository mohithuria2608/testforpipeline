import * as Constant from '../../constant'
import { consolelog, cryptData } from '../../utils'
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

            // if (payload.url.indexOf(Constant.DATABASE.ACTION.DEEPLINK.ADD_MEMBER) != -1) {

            //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>.....option.url..", option.url);

            //     let chatId = option.url.split('/')[4]
            //     if (chatId) {
            //         let chatData = await ENTITY.ChatC.getOneEntity({ _id: chatId }, { groupInfo: 1, members: 1 })
            //         if (chatData && chatData._id) {
            //             option['title'] = chatData.groupInfo.groupName
            //             if (chatData && chatData.groupInfo && chatData.groupInfo.groupDescription)
            //                 option['description'] = chatData.groupInfo.groupDescription
            //             else
            //                 option['description'] = 'Group'
            //             if (chatData && chatData.groupInfo && chatData.groupInfo.groupImage)
            //                 option['image'] = config.get('host.im.url').toString() + config.get('basepath.url.groupmedia').toString() + chatData.groupInfo.groupImage
            //         }
            //     }
            // }
            console.log("Constant.SERVER.TEMPLATE_PATH", Constant.SERVER.TEMPLATE_PATH)
            let content = await templateLib.compileFile(Constant.SERVER.TEMPLATE_PATH + 'deeplink.html', option)
            return (content)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

export const deeplinkController = new DeeplinkController();