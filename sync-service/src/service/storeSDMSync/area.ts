/** area mapping */

import { Aerospike } from "../../aerospike";
import { SoapManager, generateRandomString, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetStoresAreaList', params),
        list = await listData.GetStoresAreaListResult.CC_STORE_AREA;

    // reset the sync collection
    await Aerospike.truncate({set:'sync_area'});

    let batchSize = 50;
    let totalRecords = list.length;
    let batches: number[] = [];

    while (totalRecords > 0) {
        batches.push(totalRecords >= batchSize ? batchSize : totalRecords);
        totalRecords -= batchSize;
    }
    await batchProcess(list, batches);
    console.log("\t# Area Sequence Complete");
}

// gets the area detail
async function getAreaDetail(areaId: number, storeId: number) {

    let params = { ...commonParams, areaID: areaId },
        singleData: any = await SoapManager.requestData('GetArea', params),
        single = await singleData.GetAreaResult;

    if (single.AREA_CITYID) {
        return {
            success: true,
            data: {
                id: generateRandomString(16),
                cityId: parseInt(single.AREA_CITYID),
                districtId: parseInt(single.AREA_DEF_DISTRICTID),
                streetId: parseInt(single.AREA_DEF_STREETID),
                areaId: parseInt(single.AREA_ID),
                provinceId: parseInt(single.AREA_PROVINCEID),
                countryId: parseInt(single.AREA_COUNTRYID),
                name_en: single.AREA_NAME || "",
                name_ar: single.AREA_NAMEUN || "",
                storeId: storeId
            }
        };
    } else return { success: false };
}

// batch processing of area list
async function batchProcess(list, batches) {
    let start = 0;
    for (let i = 0; i < batches.length; i++) {
        let areaResolvers: any = [];
        for (let j = start; j < start + batches[i]; j++) {
            areaResolvers.push(getAreaDetail(parseInt(list[j].STR_AREAID), parseInt(list[j].STR_ID)));
        }
        let areaList: any = await Promise.all(areaResolvers);
        for (let area of areaList) {
            if (area.success) {
                await Aerospike.put({
                    bins: area.data,
                    set: 'sync_area',
                    key: area.data.areaId,
                    createOrReplace: true
                });
            }
        }
        start += batches[i];
    }
}