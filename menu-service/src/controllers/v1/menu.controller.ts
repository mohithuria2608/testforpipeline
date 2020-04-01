import * as fs from 'fs';
import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { uploadService } from '../../grpc/client';

export class MenuController {
    constructor() { }

    /**
     * @method BOOTSTRAP
     * @description : Post bulk menu data
     * */
    async bootstrapMenu() {
        try {
            await Aerospike.truncate({ set: ENTITY.MenuEnE.set, before_nanos: 0 })
            await Aerospike.truncate({ set: ENTITY.MenuArE.set, before_nanos: 0 })
            let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            for (const iterator of menu) {
                ENTITY.MenuEnE.postMenu(iterator)
                ENTITY.MenuArE.postMenu(iterator)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "bootstrapMenu", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

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
    * */
    async syncToAS(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv);
            switch (data.language) {
                case Constant.DATABASE.LANGUAGE.EN: await ENTITY.MenuEnE.postMenu(data); break;
                case Constant.DATABASE.LANGUAGE.AR: await ENTITY.MenuArE.postMenu(data); break;
            }
            // upload the menu to the blob storage
            uploadService.uploadToBlob({ name: `kfc_uae_1_${data.language}.json`, json: JSON.stringify(data) })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const menuController = new MenuController();