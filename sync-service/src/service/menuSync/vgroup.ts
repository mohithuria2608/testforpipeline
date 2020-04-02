/** Virtual Group Sequence */

import * as Constant from "../../constant";
import { Aerospike } from "../../aerospike";
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetVirtualGroups', params),
        list = await listData.GetVirtualGroupsResult.CC_WEB_VGROUP;

    // remove all elements from web combo
    await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_MENU_VGROUP });

    for (let i = 0; i < list.length; i++) {
        let saveDataRoot: any = {
            vigId: parseInt(list[i].VIG_ID),
            description_en: list[i].VIG_DESCRIPTION || "",
            description_ar: list[i].VIG_DESCRIPTION_UN || "",
            custType: parseInt(list[i].VIG_CUSTOMIZATION_TYPE),
            selector1: parseInt(list[i].VIG_SELECTOR1) > 0 ? parseInt(list[i].VIG_SELECTOR1) : -1,
            selector1Value: parseInt(list[i].VIG_SELECTOR1_VALUE) > 0 ? parseInt(list[i].VIG_SELECTOR1_VALUE) : -1,
            selector2: parseInt(list[i].VIG_SELECTOR2) > 0 ? parseInt(list[i].VIG_SELECTOR2) : -1,
            selector2Value: parseInt(list[i].VIG_SELECTOR2_VALUE) > 0 ? parseInt(list[i].VIG_SELECTOR2_VALUE) : -1,
            selector3: parseInt(list[i].VIG_SELECTOR3) > 0 ? parseInt(list[i].VIG_SELECTOR3) : -1,
            selector3Value: parseInt(list[i].VIG_SELECTOR3_VALUE) > 0 ? parseInt(list[i].VIG_SELECTOR3_VALUE) : -1,
            title_en: list[i].VIG_TITLE || "",
            title_ar: list[i].VIG_TITLE_UN || "",
            createdAt: list[i].CRT_DATE,
            updatedAt: list[i].UPT_DATE
        };

        await Aerospike.put({
            bins: saveDataRoot,
            set: Constant.SET_NAME.SYNC_MENU_VGROUP,
            key: saveDataRoot.vigId,
            create: true
        });
    }
    // await Aerospike.exportData(collections.vGroup);
    console.log("\t# Virtual Group Sequence Complete");
}