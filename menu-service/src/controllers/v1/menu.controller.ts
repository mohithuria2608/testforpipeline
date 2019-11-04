import * as Constant from '../../constant'
import { consolelog } from '../../utils'

export class MenuController {

    constructor() { }

    async fetchMenu(payload: IGuestMenuRequest.IGuestMenuFetch) {
        try {
            
            return {}
        } catch (err) {
            consolelog("fetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const menuController = new MenuController();