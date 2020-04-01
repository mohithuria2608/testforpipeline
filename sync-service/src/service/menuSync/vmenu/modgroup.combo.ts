// get mod group data for single item

import { SoapManager, commonParams } from "../../../utils";

const priceToPrecision = function (price: number) {
    let basePrice = Math.floor(price);
    if (price - basePrice > 0) {
        return parseFloat(price.toFixed(2));
    } else return basePrice;
}

export default async function (step: any, singleItemData: any) {

    let params = { ...commonParams, itemID: step.itemId.toString() }, // fixed params
        listData: any = await SoapManager.requestData('GetModgroupsList', params);

    // check if modGroup list returned any elements
    if (listData.GetModgroupsListResult && listData.GetModgroupsListResult.CModGroup) {

        // store the list [or object in case of single] in list
        let modGroupList = listData.GetModgroupsListResult.CModGroup;

        let modGroupOptions: any = [];

        // check if modGroupList is an array
        if (Array.isArray(modGroupList)) {
            for (let modGroup of modGroupList) {
                let getModGroupData: any = await modGroupSequence(modGroup);
                if (getModGroupData) modGroupOptions.push(getModGroupData);
            }
        } else {
            let getModGroupData: any = await modGroupSequence(modGroupList);
            if (getModGroupData) modGroupOptions.push(getModGroupData);
        }

        // return the processed data out of the mod groups
        return processModData(modGroupOptions, singleItemData);

    } else return { data: [] };

}

// mod group sequence processor
async function modGroupSequence(modGroup: any) {

    // check if this mod group is visible
    // 10231 - Free Items OLO; 10124 - Add On
    if (modGroup.Visible === "true" && (modGroup.ID !== "10231" && modGroup.ID !== "10124")) {

        let rootModGroupData: any = {
            groupId: parseInt(modGroup.ID),
            title_en: modGroup.Title || "",
            title_ar: modGroup.TitleUn || "",
            subtitle_en: modGroup.Question || "",
            subtitle_ar: modGroup.QuestionUn || "",
            price: priceToPrecision(parseFloat(modGroup.Price)),
            maximum: parseInt(modGroup.Maximum),
            minimum: parseInt(modGroup.Minimum),
            mergeWith: parseInt(modGroup.MergeWithModGroupID),
            itemStyle: parseInt(modGroup.DefaultItemStyle),
            ingredient: parseInt(modGroup.Ingredient),
            options: []
        }

        // for customizations we will request the modifiers list api
        let modListParams = { ...commonParams, modgroupID: modGroup.ID },
            modListData: any = await SoapManager.requestData('GetModifiersList', modListParams);

        // check if modGroup list returned any elements
        if (modListData.GetModifiersListResult && modListData.GetModifiersListResult.CItem) {
            let modList: any = modListData.GetModifiersListResult.CItem;

            // check if modList is an array
            if (Array.isArray(modList)) {
                let sequence = 1;
                for (let mod of modList) {
                    let checkModMeta = modDataCheck(mod);
                    if (checkModMeta) {
                        rootModGroupData.options.push({
                            id: parseInt(mod.ID),
                            sequence: sequence++,
                            modGroupId: rootModGroupData.groupId,
                            name_en: mod.Name || "",
                            name_ar: mod.NameUn || "", // can be optional
                            price: rootModGroupData.itemStyle === 0 ? rootModGroupData.price : priceToPrecision(parseFloat(mod.Price)),
                        });
                    }
                }
            } else {
                let checkModMeta = modDataCheck(modList);
                if (checkModMeta) {
                    rootModGroupData.options.push({
                        id: parseInt(modList.ID),
                        sequence: 1,
                        modGroupId: rootModGroupData.groupId,
                        name_en: modList.Name || "",
                        name_ar: modList.NameUn || "", // can be optional
                        price: rootModGroupData.itemStyle === 0 ? rootModGroupData.price : priceToPrecision(parseFloat(modList.Price)),
                    });
                }
            }
            return rootModGroupData;
        } else return null;
    } else return null;
}

// checks mod data for sanity
function modDataCheck(mod: any) {

    // check if this mod is visible
    if (mod.Visible === "1") {
        return true;
    } else return false;
}

// processes the mod data for final result
async function processModData(modGroupList, singleItemData) {

    let finalModGroups: any = [];

    // search the mergeable Id in modGroupList
    for (let i = 0; i < modGroupList.length; i++) {
        if (modGroupList[i].mergeWith !== 0) {
            for (let j = 0; j < modGroupList.length; j++) {
                if (modGroupList[i].mergeWith === modGroupList[j].groupId) {
                    modGroupList[j].options.push(...modGroupList[i].options);
                }
            }
        }
    }

    // keep only the independent mod groups
    for (let k = 0; k < modGroupList.length; k++) {
        if (modGroupList[k].mergeWith === 0) {
            // finalModGroups.push(modGroupList[k]);

            // assign a sequence for all the modifiers
            for (let op = 0; op < modGroupList[k].options.length; op++) {
                modGroupList[k].options[op].sequence = op + 1;
            }

            // assign customization for ingredients level customization
            let customOptions = { displayType: 'stepper' };
            if (modGroupList[k].ingredient) {
                // let flag = 1;
                // let params = { ...commonParams, modgroupID: modGroupList[k].groupId.toString() }, // fixed params
                //     modifiersList: any = await SoapManager.requestData('GetModifiersList', params),
                //     modifiersListData: any = modifiersList.GetModifiersListResult.CItem;
                // console.log("TCL: processModData -> modifiersListData", singleItemData.PreAttachedCondiments.CPreAttachedCondiment);
                // console.log("TCL: processModData -> modifiersListData", modifiersListData);

                // process.exit();
                let itemFlagData = {};
                if (singleItemData.PreAttachedCondiments) {
                    for (let preAttachCondiment of singleItemData.PreAttachedCondiments.CPreAttachedCondiment) {
                        let params = { ...commonParams, modgroupID: preAttachCondiment.GroupID }, // fixed params
                            modifiersList: any = await SoapManager.requestData('GetModifiersList', params),
                            modifiersListData: any = modifiersList.GetModifiersListResult.CItem;
                        try {
                            if (Array.isArray(modifiersListData)) {
                                for (let modifierData of modifiersListData) {
                                    if (preAttachCondiment.CondimentID === modifierData.ID && modifierData.Visible === '1') {
                                        itemFlagData[preAttachCondiment.CondimentID] = true;
                                    }
                                }
                            } else {
                                if (preAttachCondiment.CondimentID === modifiersListData.ID && modifiersListData.Visible === '1') {
                                    itemFlagData[preAttachCondiment.CondimentID] = true;
                                }
                            }
                        } catch (err) {
                            console.log("ERRORROROROR --> ", preAttachCondiment.GroupID, modifiersListData, err);
                            throw err;
                        }
                    }
                }

                customOptions = { displayType: 'checkbox' }
                for (let op = 0; op < modGroupList[k].options.length; op++) {
                    let isSelectedModifier = itemFlagData[modGroupList[k].options[op].id.toString()] ? true : false;
                    modGroupList[k].options[op].selected = 1;
                    modGroupList[k].options[op].displayType = 'radio';
                    modGroupList[k].options[op].subOptions = [
                        {
                            name_en: "None",
                            price: 0,
                            selected: isSelectedModifier ? 0 : 1
                        },
                        {
                            name_en: "Regular",
                            price: isSelectedModifier ? 0 : priceToPrecision(modGroupList[k].options[op].price),
                            selected: isSelectedModifier ? 1 : 0
                        },
                        {
                            name_en: "Extra",
                            price: priceToPrecision(modGroupList[k].options[op].price * (isSelectedModifier ? 1 : 2)),
                            selected: 0
                        }
                    ];
                    modGroupList[k].options[op].price = modGroupList[k].options[op].price; // explicitly set the price to 0
                }
            }

            // assign default for stepper based mod group
            if (!modGroupList[k].itemStyle && !modGroupList[k].ingredient) {
                let extraDefault = modGroupList[k].minimum % modGroupList[k].options.length;
                if (extraDefault > 0) {
                    for (let op = 0; op < modGroupList[k].options.length; op++) {
                        let defaultVal = Math.floor(modGroupList[k].minimum / modGroupList[k].options.length) + extraDefault--;
                        modGroupList[k].options[op].default = defaultVal;
                    }
                } else {
                    for (let op = 0; op < modGroupList[k].options.length; op++) {
                        modGroupList[k].options[op].default = modGroupList[k].minimum / modGroupList[k].options.length;
                    }
                }
            }

            if (!modGroupList[k].itemStyle || modGroupList[k].ingredient) {
                finalModGroups.push({
                    title_en: modGroupList[k].title_en,
                    title_ar: modGroupList[k].title_ar,
                    subtitle_en: modGroupList[k].subtitle_en,
                    subtitle_ar: modGroupList[k].subtitle_ar,
                    maximum: modGroupList[k].maximum,
                    minimum: modGroupList[k].minimum,
                    ...customOptions,
                    itemStyle: modGroupList[k].itemStyle,
                    ingredient: modGroupList[k].ingredient,
                    options: modGroupList[k].options,
                });
            }
        }
    }

    return { data: finalModGroups }
}