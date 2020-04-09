/** web area sequence mapping */

import { Aerospike } from "../../aerospike";
import * as Constant from "../../constant";
// import * as fs from "fs";
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let cities = await Aerospike.scan({ set: Constant.SET_NAME.SYNC_CITY });

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetStoresAreaList', params),
        storeAreaList = await listData.GetStoresAreaListResult.CC_STORE_AREA;

    // reset the sync collection
    await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_WEB_AREA });
    await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_AREA });

    for (let storeArea of storeAreaList) {
        let storeAreaData = {
            sdmAreaId: parseInt(storeArea.STR_AREAID),
            sdmStoreId: parseInt(storeArea.STR_ID)
        }
        await Aerospike.put({
            bins: storeAreaData,
            set: Constant.SET_NAME.SYNC_WEB_AREA,
            key: storeAreaData.sdmAreaId,
            create: true
        });
    }


    for (let city of cities) {
        let params = { ...commonParams, lang: 'En', countryID: '1', provinceID: '7', cityID: city.sdmCityId };
        delete params.language;
        delete params.conceptID;
        delete params.menuTemplateID;

        let listData: any = await SoapManager.requestData('GetWebAreasList', params),
            list = listData.GetWebAreasListResult.CC_WEB_AREA;

        for (let webArea of list) {

            if (webArea.AREA_ID !== "-1") {

                let storeAreaData = await Aerospike.get({
                    set: Constant.SET_NAME.SYNC_WEB_AREA,
                    key: parseInt(webArea.AREA_ID)
                });

                if (storeAreaData.sdmAreaId) {
                    let webAreaData = {
                        countryId: 'AE',
                        sdmCountryId: 1,
                        active: (webArea.AREA_ACTIVE === "1") ? 1 : 2,
                        sdmAreaId: parseInt(webArea.AREA_ID),
                        cityId: parseInt(webArea.AREA_CITYID),
                        areaName: webArea.AREA_NAME || "",
                        areaNameAr: webArea.AREA_NAMEUN || "",
                        districtId: -1,
                        streetId: -1,
                        provinceId: 7,
                        sdmStoreId: storeAreaData.sdmStoreId,
                        areaPinCode: 1,
                        delRefCode: 1,
                        validAreaType: 1
                    };

                    // save and insert data into database
                    await Aerospike.put({
                        bins: webAreaData,
                        set: Constant.SET_NAME.SYNC_AREA,
                        key: webAreaData.sdmAreaId,
                        createOrReplace: true
                    });
                }
            }
        }
    }

    // let data = await Aerospike.scan({ set: Constant.SET_NAME.SYNC_AREA });
    // fs.writeFileSync(`${Constant.SET_NAME.SYNC_AREA}.json`, JSON.stringify(data));

    console.log("\t# Area Sequence Complete");
}