/**
 * @file sequence/vmenu
 * @description defines virtual menu sequence mapping
 * @created 2019-11-28 11:55:33
*/

import subMenu from "./submenu";
import * as Constant from "../../../constant";
import { Aerospike } from "../../../aerospike";


export default async function (menuId: number) {

    let menuData: any = await Promise.all(await subMenu(menuId));

    let outputData: any = {
        "menuTempId": 17,
        "conceptId": 3,
        "menuId": menuId,
        "updatedAt": Date.now(),
        "categories": []
    }

    for (let menuItem of menuData) {
        if (menuItem.success) {
            outputData.categories.push(menuItem.data);
        }
    }

    await Aerospike.put({
        bins: outputData,
        set: Constant.SET_NAME.SYNC_MENU,
        key: outputData.menuId,
        createOrReplace: true
    });

}