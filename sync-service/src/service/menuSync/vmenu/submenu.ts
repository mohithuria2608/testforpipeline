/** Sub menu sequence */

import product from "./product";
import * as Constant from "../../../constant";
import { Aerospike } from "../../../aerospike";
import { SoapManager, commonParams } from "../../../utils";

export default async function (menuId: number) {

    let params = { ...commonParams, menuID: menuId },
        listData: any = await SoapManager.requestData('GetSubmenusList', params),
        list = listData.GetSubmenusListResult.CSubmenu,
        subMenuPromises: any = [];

    let total = list.length; // for percentage counter
    let counter = 0;

    // create promise for all types of promise for parallel processing
    for (let menuItem of list) {

        subMenuPromises.push(
            new Promise(
                async (resolve, reject) => {
                    try {
                        let toResolve = { success: false, data: {} };
                        if (menuItem.Title.match(/^\w/)) {
                            let singleParam = { ...commonParams, submenuID: menuItem.ID },
                                singleData: any = await SoapManager.requestData('GetSubmenu', singleParam),
                                single = singleData.GetSubmenuResult;

                            let rootMenuData: any = {
                                id: parseInt(menuItem.ID),
                                title_en: single.Title || "",
                                title_ar: single.TitleUn || "",
                                sequence: parseInt(menuItem.Sequence),
                                products: []
                            };

                            // for every element in that menu, map the data into product
                            for (let element of single.Elements.CObject) {
                                let productDetail = await product(rootMenuData.id, element);
                                if (productDetail) rootMenuData.products.push(productDetail);
                            }
                            rootMenuData.products = await vSubMenuFormatter(rootMenuData.products, rootMenuData.id);
                            toResolve.success = true;
                            toResolve.data = rootMenuData;
                        }

                        console.log(`\t# Category sequence ${Math.round((++counter * 100) / total)}% completed`)
                        resolve(toResolve); // resolve with data
                    } catch (err) {
                        console.log(`Error in ${menuItem.ID}`, err);
                        reject(err);
                    }
                }
            )
        );
    }
    return subMenuPromises;
}

async function vSubMenuFormatter(productList, catId) {
    // create list of only virtual group products
    let vProductList: any = [];
    let finalProducts: any = [];

    for (let i = 0; i < productList.length; i++) {
        if (productList[i].vGroupId) {
            vProductList.push(productList[i]);
        } else {
            finalProducts.push(productList[i]);
        }
    }
    vProductList = groupBy(vProductList, 'vGroupId');

    // for every virtual product, get the detail of virtual group
    for (let vGroupId in vProductList) {
        // get the virtual group data
        let vGroupASP: any = await Aerospike.get({
            set: Constant.SET_NAME.SYNC_MENU_VGROUP,
            key: parseInt(vGroupId)
        }),
            vGroupData: any = vGroupASP.bins;

        let variationMetaData: any = await generateVariants(vProductList[vGroupId], vGroupData);

        let finalProductData: any = {
            id: parseInt(vGroupId),
            catId: catId,
            title_en: vGroupData.title_en,
            title_ar: vGroupData.title_ar,
            description_en: vGroupData.description_en,
            description_ar: vGroupData.description_ar,
            vGroupId: parseInt(vGroupId),
            isCustomizable: 1,
            sequence: variationMetaData.selectedVariantData.sequence,
            price: variationMetaData.selectedVariantData.price,
            selectedItem: variationMetaData.selectedVariantData.id,
            variants: variationMetaData.variationData,
            products: vProductList[vGroupId]
        }

        if (vProductList[vGroupId][0].itemType === 'standalone') {
            finalProductData.itemType = 'standalone_group';
        } else { finalProductData.itemType = 'bundle_group'; }

        finalProducts.push(finalProductData);
    }
    return finalProducts;
}

async function generateVariants(vGroupList, groupDataASP) {
    let variationData: any = [];
    let varDefaults: any = { sel1: -1, sel2: -1, sel3: -1 };
    for (let selIndex = 1; selIndex <= 3; selIndex++) {
        if (
            (groupDataASP[`selector${selIndex}`] !== -1 && groupDataASP[`selector${selIndex}`] !== 0)
            &&
            (vGroupList[0][`sel${selIndex}Value`] !== -1 && vGroupList[0][`sel${selIndex}Value`] !== 0)
        ) {
            let vSelASP: any = await await Aerospike.get({
                set: Constant.SET_NAME.SYNC_MENU_VSELECTOR,
                key: groupDataASP[`selector${selIndex}`]
            }),
                vSelData: any = vSelASP.bins;
            variationData.push({
                id: groupDataASP[`selector${selIndex}`],
                title_en: vSelData.title_en,
                title_ar: vSelData.title_ar,
                selIndex: selIndex,
                subtitle_en: `Choose your ${vSelData.title_en}`,
                subtitle_ar: `Choose your ${vSelData.title_en}`,
                options: []
            });
            varDefaults[`sel${selIndex}`] = groupDataASP[`selector${selIndex}Value`];
            for (let i = 0; i < vGroupList.length; i++) {
                let selValueData = findSelectorValue(vSelData.values, vGroupList[i][`sel${selIndex}Value`]);
                if (selValueData) {
                    if (vGroupList[i][`sel${selIndex}Value`] === groupDataASP[`selector${selIndex}Value`]) {
                        selValueData['isSelected'] = 1;
                    } else {
                        selValueData['isSelected'] = 0;
                    }
                    variationData[selIndex - 1].options.push(selValueData);
                }
            }
        }
    }

    let selectedVariantData = null;
    for (let i = 0; i < vGroupList.length; i++) {
        if (vGroupList[i].sel1Value === varDefaults.sel1) {
            if (vGroupList[i].sel2Value && vGroupList[i].sel2Value === varDefaults.sel2) {
                if (vGroupList[i].sel3Value && vGroupList[i].sel3Value === varDefaults.sel3) {
                    selectedVariantData = vGroupList[i];
                } else selectedVariantData = vGroupList[i];
            } else selectedVariantData = vGroupList[i];
        }
    }

    if (!selectedVariantData) {
        selectedVariantData = vGroupList[0];
    }

    // return variationData as well as default item
    return { variationData, selectedVariantData };
}

const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
};

// finds the detail of selector value
function findSelectorValue(values, vsvId) {
    for (let i = 0; i < values.length; i++) {
        if (values[i].vsvId === vsvId) {
            return {
                id: vsvId,
                title_en: values[i].title_en,
                title_ar: values[i].title_ar,
            }
        }
    }
    return null;
}