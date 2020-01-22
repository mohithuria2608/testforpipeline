import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class MenuController {
    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk menu data
     * */
    async bootstrapMenu() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            for (const iterator of menu) {
                console.log(iterator.menuId, iterator.language)
                ENTITY.MenuE.postMenu(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapMenu", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchMenu(headers: ICommonRequest.IHeaders, payload: IMenuRequest.IFetchMenu) {
        try {
            let menuId = payload.menuId ? parseInt(payload.menuId.toString()) : 5;
            return await ENTITY.MenuE.getMenu({ menuId: menuId, language: headers.language })
        } catch (error) {
            consolelog(process.cwd(), "fetchMenu", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} country :current country of user
    * @param {boolean} isDefault :want to fetch default menu or not
    * */
    async grpcFetchMenu(payload: IMenuGrpcRequest.IFetchMenuData) {
        try {
            let menuId = 5;
            let menu = await ENTITY.MenuE.getMenu({ menuId: menuId, language: payload.language })
            return { menu: JSON.stringify(menu) }
        } catch (error) {
            consolelog(process.cwd(), "grpcFetchMenu", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} type  enum[menu, upsell]
    * @param {string} data  actuall array of menu or upsell
    * */
    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (data.type == "menu") {
                if (payload.as.create || payload.as.update || payload.as.get) {
                    if (payload.as.create) {

                    }
                    if (payload.as.update) {

                    }
                }
            }
            if (data.type == "upsell") {
                if (payload.as.create || payload.as.update || payload.as.get) {
                    if (payload.as.create) {

                    }
                    if (payload.as.update) {

                    }
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }
}

export const menuController = new MenuController();