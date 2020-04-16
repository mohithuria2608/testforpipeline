import * as Constant from '../../constant'
import { consolelog, sendRequestToCMS } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { uploadService } from '../../grpc/client';

export class MenuController {
    constructor() { }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchMenu(headers: ICommonRequest.IHeaders, payload: IMenuRequest.IFetchMenu) {
        try {
            let menuId = payload.menuId ? parseInt(payload.menuId.toString()) : 1;
            let menu = {}
            switch (headers.language) {
                case Constant.DATABASE.LANGUAGE.EN: menu = await ENTITY.MenuEnE.getMenu({ menuId: menuId }); break;
                case Constant.DATABASE.LANGUAGE.AR: menu = await ENTITY.MenuArE.getMenu({ menuId: menuId }); break;
            }
            if (menu && menu['menuId'])
                return menu
            else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.MENU_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "fetchMenu", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {number} menuId :menuId
    * @param {string} language :language
    * */
    async grpcFetchMenu(payload: IMenuGrpcRequest.IFetchMenuData) {
        try {
            let menu = {}
            switch (payload.language) {
                case Constant.DATABASE.LANGUAGE.EN: menu = await ENTITY.MenuEnE.getMenu({ menuId: payload.menuId }); break;
                case Constant.DATABASE.LANGUAGE.AR: menu = await ENTITY.MenuArE.getMenu({ menuId: payload.menuId }); break;
            }
            return { menu: JSON.stringify(menu) }
        } catch (error) {
            consolelog(process.cwd(), "grpcFetchMenu", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {string} type  enum[menu, upsell]
     * @param {string} data  actuall array of menu or upsell
     */
    async sync(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv);
            switch (data.event) {
                case "cms_menu_sync": await this.syncToAS(data.data); break;
                case "sdm_menu_sync": await this.syncToCMS(data.data); break;
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "sync", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {string} type  enum[menu, upsell]
     * @param {string} data  actuall array of menu or upsell
     */
    async syncToAS(payload) {
        try {
            let data = payload[0];
            switch (data.language) {
                case Constant.DATABASE.LANGUAGE.EN: await ENTITY.MenuEnE.postMenu(data); break;
                case Constant.DATABASE.LANGUAGE.AR: await ENTITY.MenuArE.postMenu(data); break;
            }
            // upload the menu to the blob storage
            uploadService.uploadToBlob({ name: `kfc_uae_1_${data.language}.json`, json: JSON.stringify(data) })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncToAS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @method GRPC
     * @param {string} type  enum[menu, upsell]
     * @param {string} data  actuall array of menu or upsell
     * @todo-country country management
     */
    async syncToCMS(payload) {
        try {
            let syncMenuData = await Aerospike.get({ set: Constant.SET_NAME.SYNC_MENU, key: payload.menuId });
            await sendRequestToCMS('SYNC_MENU', syncMenuData);
        } catch (error) {
            consolelog(process.cwd(), "syncToCMS", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }


}

export const menuController = new MenuController();