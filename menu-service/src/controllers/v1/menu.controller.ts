import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as fs from 'fs'

export class MenuController {
    constructor() { }

    /**
    * @method GET
    * */
    async fetchMenu(headers: ICommonRequest.IHeaders) {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/store.json', 'utf-8');
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
            let rawdata = fs.readFileSync(__dirname + '/../../../model/store.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            return menu
        } catch (err) {
            consolelog("grpcFetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const menuController = new MenuController();