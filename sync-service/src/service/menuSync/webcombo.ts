/** Web Combo Sequence */

import * as Constant from "../../constant";
import { Aerospike } from "../../aerospike";
import { SoapManager, commonParams } from "../../utils";

const priceToPrecision = function (price: number) {
    let basePrice = Math.floor(price);
    if (price - basePrice > 0) {
        return parseFloat(price.toFixed(2));
    } else return basePrice;
}

export default async function () {

    // fetch the web combo data from the GetWebCombosList API
    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetWebCombosList', params),
        list = await listData.GetWebCombosListResult.WebCombo;

    // remove all elements from web combo
    await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_MENU_WEBCOMBO });

    // process the list data
    for (let i = 0; i < list.length; i++) {
        let saveDataRoot: any = {
            comboId: parseInt(list[i].ID),
            title_en: list[i].Title || "",
            title_ar: list[i].TitleUn || "",
            price: priceToPrecision(parseFloat(list[i].Price)),
            promoId: parseInt(list[i].PromoID),
            selector1Value: parseInt(list[i].Selectore1Value),
            selector2Value: parseInt(list[i].Selectore2Value),
            selector3Value: parseInt(list[i].Selectore3Value),
            virtualGroupId: parseInt(list[i].VirtualGroupID),
            description_en: list[i].Description || "",
            description_ar: list[i].DescriptionUn || "",
            steps: [],
        };

        // sort webcombos by their component index, that is order of steps
        list[i].Steps.WebComboStep.sort((a, b) => a.CompID - b.CompID);

        // process the combo steps data
        for (let j = 0; j < list[i].Steps.WebComboStep.length; j++) {
            let saveDataStep: any = {
                compId: parseInt(list[i].Steps.WebComboStep[j].CompID),
                description_en: list[i].Steps.WebComboStep[j].Description || "",
                description_ar: list[i].Steps.WebComboStep[j].DescriptionUn || "",
                stepId: parseInt(list[i].Steps.WebComboStep[j].ID),
                title_en: list[i].Steps.WebComboStep[j].Title || "",
                title_ar: list[i].Steps.WebComboStep[j].TitleUn || "",
                items: []
            };

            if (Array.isArray(list[i].Steps.WebComboStep[j].Items.WebComboStepItem)) {
                for (let k = 0; k < list[i].Steps.WebComboStep[j].Items.WebComboStepItem.length; k++) {
                    saveDataStep.items.push({
                        compId: parseInt(list[i].Steps.WebComboStep[j].Items.WebComboStepItem[k].CompID),
                        itemId: parseInt(list[i].Steps.WebComboStep[j].Items.WebComboStepItem[k].ItemID),
                        price: priceToPrecision(parseFloat(list[i].Steps.WebComboStep[j].Items.WebComboStepItem[k].Price)),
                        promoId: parseInt(list[i].Steps.WebComboStep[j].Items.WebComboStepItem[k].PromoID)
                    });
                }
            } else {
                saveDataStep.items.push({
                    compId: parseInt(list[i].Steps.WebComboStep[j].Items.WebComboStepItem.CompID),
                    itemId: parseInt(list[i].Steps.WebComboStep[j].Items.WebComboStepItem.ItemID),
                    price: priceToPrecision(parseFloat(list[i].Steps.WebComboStep[j].Items.WebComboStepItem.Price)),
                    promoId: parseInt(list[i].Steps.WebComboStep[j].Items.WebComboStepItem.PromoID)
                });
            }
            saveDataRoot.steps.push(saveDataStep);
        }

        await Aerospike.put({
            bins: saveDataRoot,
            set: Constant.SET_NAME.SYNC_MENU_WEBCOMBO,
            key: saveDataRoot.comboId,
            create: true
        });
    }

    console.log("\t# Web Combo Sequence Complete");
}