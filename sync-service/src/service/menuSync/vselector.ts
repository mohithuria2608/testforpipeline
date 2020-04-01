/** Virtual Selector Sequence */

import * as Constant from "../../constant";
import { Aerospike } from "../../aerospike";
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetVirtualSelectors', params),
        list = await listData.GetVirtualSelectorsResult.CC_WEB_VSELECTOR;

    // remove all elements from vSelector collection
    await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_MENU_VSELECTOR });

    // process the list data
    for (let i = 0; i < list.length; i++) {
        let saveDataRoot: any = {
            createdAt: list[i].CRT_DATE,
            updatedAt: list[i].CRT_DATE,
            description_en: list[i].VS_DESCRIPTION || "",
            description_ar: list[i].VS_DESCRIPTION_UN || "",
            vsId: parseInt(list[i].VS_ID),
            title_en: list[i].VS_TITLE || "",
            title_ar: list[i].VS_TITLE_UN || "",
            values: []
        };

        // process the list for key values
        for (let j = 0; j < list[i].Values.KeyValueOfintCC_WEB_VSELECTOR_VALUEw_PEY1RNb.length; j++) {
            let saveDataValues: any = {
                key: parseInt(list[i].Values.KeyValueOfintCC_WEB_VSELECTOR_VALUEw_PEY1RNb[j].Key),
                vsvId: parseInt(list[i].Values.KeyValueOfintCC_WEB_VSELECTOR_VALUEw_PEY1RNb[j].Value.VSV_ID),
                description_en: list[i].Values.KeyValueOfintCC_WEB_VSELECTOR_VALUEw_PEY1RNb[j].Value.VSV_DESCRIPTION || "",
                description_ar: list[i].Values.KeyValueOfintCC_WEB_VSELECTOR_VALUEw_PEY1RNb[j].Value.VSV_DESCRIPTION_UN || "",
                vsvSequence: parseInt(list[i].Values.KeyValueOfintCC_WEB_VSELECTOR_VALUEw_PEY1RNb[j].Value.VSV_SEQ),
                title_en: list[i].Values.KeyValueOfintCC_WEB_VSELECTOR_VALUEw_PEY1RNb[j].Value.VSV_TITLE || "",
                title_ar: list[i].Values.KeyValueOfintCC_WEB_VSELECTOR_VALUEw_PEY1RNb[j].Value.VSV_TITLE_UN || ""
            };
            saveDataRoot.values.push(saveDataValues);
        }

        await Aerospike.put({
            bins: saveDataRoot,
            set: Constant.SET_NAME.SYNC_MENU_VSELECTOR,
            key: saveDataRoot.vsId,
            create: true
        })
    }

    console.log("\t# Virtual Selector Sequence Complete");
}