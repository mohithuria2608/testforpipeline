import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as fs from 'fs'


export class MenuController {

    constructor() { }

    async fetchMenu(payload: IGuestMenuRequest.IGuestMenuFetch) {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../../model/store.json', 'utf-8');
            let store = JSON.parse(rawdata);

            return store
        } catch (err) {
            consolelog("fetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const menuController = new MenuController();