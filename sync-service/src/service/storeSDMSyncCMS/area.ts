/** area mapping */

import { Aerospike } from "../../aerospike";
import * as Constant from "../../constant";
import { SoapManager, generateRandomString, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetStoresAreaList', params),
        list = await listData.GetStoresAreaListResult.CC_STORE_AREA;

    // reset the sync collection
    await Aerospike.truncate({ set: 'sync_area' });

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

    if (single && single.AREA_CITYID) {
        return {
            success: true,
            data: {
                countryId: parseInt(single.AREA_COUNTRYID),
                cityId: parseInt(single.AREA_CITYID),
                areaName: single.AREA_NAME || "",
                areaNameAr: single.AREA_NAMEUN || "",
                districtId: parseInt(single.AREA_DEF_DISTRICTID),
                streetId: parseInt(single.AREA_DEF_STREETID),
                sdmAreaId: parseInt(single.AREA_ID),
                provinceId: parseInt(single.AREA_PROVINCEID),
                storeId: storeId,
                areaPinCode: "1",
                deliveryRefCode: "1",
                validAreaType: "1"
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
                    set: Constant.SET_NAME.SYNC_AREA,
                    key: area.data.sdmAreaId,
                    createOrReplace: true
                });
            }
        }
        start += batches[i];
    }
}