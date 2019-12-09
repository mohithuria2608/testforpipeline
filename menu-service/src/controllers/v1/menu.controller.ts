import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as fs from 'fs'
import * as ENTITY from '../../entity'

export class MenuController {
    constructor() { }

    /**
     * @method POST
     * @description : Post bulk menu data
     * */
    async postMenu() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
            let area = JSON.parse(rawdata);
            for (const iterator of area) {
                ENTITY.MenuE.postMenu(iterator)
            }
            return {}
        } catch (err) {
            consolelog("postAreaList", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * */
    async fetchMenu(headers: ICommonRequest.IHeaders, payload: IMenuRequest.IFetchMenu) {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            return menu
        } catch (err) {
            consolelog("fetchMenu", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GRPC
    * @param {string} country :current country of user
    * @param {boolean} isDefault :want to fetch default menu or not
    * */
    async grpcFetchMenu(payload: IMenuServiceRequest.IFetchMenuData) {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            return menu
        } catch (err) {
            consolelog("grpcFetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const menuController = new MenuController();