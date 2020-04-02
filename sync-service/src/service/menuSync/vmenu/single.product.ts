/** single product sequence */

import modGroupCombo from "./modgroup.combo";
import * as Constant from "../../../constant";
import { Aerospike } from "../../../aerospike";
import { SoapManager, commonParams } from "../../../utils";

const priceToPrecision = function (price: number) {
    let basePrice = Math.floor(price);
    if (price - basePrice > 0) {
        return parseFloat(price.toFixed(2));
    } else return basePrice;
}

export default async function (element: any, catId) {

    let params = { ...commonParams, itemID: element.ID },
        singleData: any = await SoapManager.requestData('GetItem', params),
        single = singleData.GetItemResult;

    // only add items if they are visible
    if (single.Visible === "1") {

        let rootSingleData: any = {
            id: parseInt(single.ID),
            sequence: parseInt(element.Sequence),
            title_en: single.Name || "",
            title_ar: single.NameUn || "",
            description_en: single.Desc || "",
            description_ar: single.DescUn || "",
            itemType: "standalone",
            catId: catId,
            isCustomizable: 0,
            price: priceToPrecision(parseFloat(single.Price)),
            steps: []
        }

        if (parseInt(single.VirtualGroupID) !== -1) {
            rootSingleData.vGroupId = parseInt(single.VirtualGroupID);
            rootSingleData.sel1Value = parseInt(single.Selectore1Value) > 0 ? parseInt(single.Selectore1Value) : -1;
            rootSingleData.sel2Value = parseInt(single.Selectore2Value) > 0 ? parseInt(single.Selectore2Value) : -1;
            rootSingleData.sel3Value = parseInt(single.Selectore3Value) > 0 ? parseInt(single.Selectore3Value) : -1;
        }

        single.itemId = single.ID;
        let modGroupData: any = await modGroupCombo(single, single);
        if (modGroupData && modGroupData.data.length) {
            rootSingleData.isCustomizable = 1;
            for (let i = 0; i < modGroupData.data.length; i++) {
                modGroupData.data[i].sequence = 1;
                rootSingleData.steps.push(modGroupData.data[i]);
            }
        }

        await Aerospike.put({
            bins: rootSingleData,
            set: Constant.SET_NAME.SYNC_MENU_PRODUCT,
            key: rootSingleData.id,
            create: true
        });

        return rootSingleData;
    } else return null;
}