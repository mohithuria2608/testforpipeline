/** combo product sequence */

import singleCombo from "./single.combo";
import * as Constant from "../../../constant";
import { Aerospike } from "../../../aerospike";

const priceToPrecision = function (price: number) {
    let basePrice = Math.floor(price);
    if (price - basePrice > 0) {
        return parseFloat(price.toFixed(2));
    } else return basePrice;
}

export default async function (element: any, catId: number) {
    try {
        let combo: any = await Aerospike.get({
            set: Constant.SET_NAME.SYNC_MENU_WEBCOMBO,
            key: parseInt(element.ID)
        });

        // if combo data found
        if (combo) {
            // root combo object for every product
            let rootComboData: any = {
                id: combo.comboId,
                sequence: parseInt(element.Sequence),
                title_en: combo.title_en,
                title_ar: combo.title_ar,
                itemType: "bundle",
                description_en: combo.description_en,
                description_ar: combo.description_ar,
                price: priceToPrecision(combo.price),
                promoId: combo.promoId,
                isCustomizable: 1,
                catId: catId,
                steps: []
            };

            if (combo.virtualGroupId !== -1) {
                rootComboData.vGroupId = combo.virtualGroupId;
                rootComboData.sel1Value = parseInt(combo.selector1Value) > 0 ? parseInt(combo.selector1Value) : -1;
                rootComboData.sel2Value = parseInt(combo.selector2Value) > 0 ? parseInt(combo.selector2Value) : -1;
                rootComboData.sel3Value = parseInt(combo.selector3Value) > 0 ? parseInt(combo.selector3Value) : -1;
            }

            // now extract data for every step
            for (let step of combo.steps) {

                // if there are more than 1 item, include them as steps
                // if (step.items.length > 1) {
                let rootStepOfCombo: any = {
                    title_en: step.title_en,
                    title_ar: step.title_ar,
                    compId: step.compId,
                    subtitle_en: step.description_en,
                    subtitle_ar: step.description_ar,
                    displayType: 'radio',
                    options: []
                };

                for (let item of step.items) {
                    let singleItemData = await singleCombo(item);
                    if (singleItemData) {
                        rootStepOfCombo.options.push(singleItemData);
                    }
                }
                rootComboData.steps.push(rootStepOfCombo);
                // } else {
                //     // otherwise make their modGroups as steps
                //     let modGroupData: any = await modGroupCombo(step.items[0]);
                //     rootComboData.steps.push(...modGroupData.data);
                // }
            }

            // add sequence in every root combo data element
            let sequence = 1;
            for (let i = 0; i < rootComboData.steps.length; i++) {
                rootComboData.steps[i].sequence = sequence++;
            }

            return rootComboData;
        } else {
            console.log("ERROR -> COMBO NOT FOUND FOR ID -> ", element.ID);
            return null; // return false value so it does not add into product list
        }
    } catch (err) {
        console.log("ERROR IN COMBO PRODUCT -> ", err);
    }
}