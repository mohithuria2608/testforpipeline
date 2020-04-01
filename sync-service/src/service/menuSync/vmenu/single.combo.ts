// get single item detail for combo items

import modGroupCombo from "./modgroup.combo";
import { SoapManager, commonParams } from "../../../utils";

const priceToPrecision = function (price: number) {
    let basePrice = Math.floor(price);
    if (price - basePrice > 0) {
        return parseFloat(price.toFixed(2));
    } else return basePrice;
}


export default async function (item: any) {

    let params = { ...commonParams, itemID: item.itemId }, // fixed params
        singleData: any = await SoapManager.requestData('GetItem', params),
        single = singleData.GetItemResult;

    if (single.Visible === "1") {

        let singleItem: any = {
            id: parseInt(single.ID),
            name_en: single.Name || "",
            name_ar: single.NameUn || "",
            price: priceToPrecision(item.price),
            promoId: item.promoId,
            selected: 0,
            modifiers: []
        };

        let modGroupData: any = await modGroupCombo(item, single);
        singleItem.modifiers.push(...modGroupData.data);

        return singleItem;
    } else return null;
}