import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from 'fs'

export class MenuController {
    constructor() { }

    /**
     * @method POST
     * @description : Post bulk menu data
     * */
    async postMenu() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/menu.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            for (const iterator of menu) {
                ENTITY.MenuE.post(iterator)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(),"postMenu", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchMenu(headers: ICommonRequest.IHeaders, payload: IMenuRequest.IFetchMenu) {
        try {
            let menuId = payload.menuId ? parseInt(payload.menuId.toString()) : 5;
            return await ENTITY.MenuE.getMenuById(menuId)
        } catch (err) {
            consolelog(process.cwd(),"fetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const menuController = new MenuController();