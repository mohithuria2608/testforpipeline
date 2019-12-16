import * as fs from 'fs';
import { consolelog, getRequest } from '../../utils';
import * as Constant from '../../constant';

export class MenuController {
    constructor() { }

    /**
    * @method GET
    * */
    async fetchMenu(payload: IMenuRequest.IMenuFetch) {
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
    * @method GET
    * */
    async fetchSuggestion(payload: IMenuRequest.ISuggestionFetch) {
        try {
            let products = await getRequest('http://40.123.207.192/rest/V1/products?searchCriteria[filterGroups][0][filters][0][field]=category_id&%20searchCriteria[filterGroups][0][filters][0][value]=6');
            return JSON.parse(products);
        } catch (err) {
            consolelog("fetchSuggestion", err, false)
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