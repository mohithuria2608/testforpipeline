/** web area sequence mapping */

import { Aerospike } from "../../aerospike";
import * as Constant from "../../constant";
import { SoapManager, generateRandomString, commonParams } from "../../utils";

export default async function () {

    let cities = await Aerospike.scan({ set: Constant.SET_NAME.SYNC_CITY });

    for (let city of cities) {

        let params = { ...commonParams, lang: 'En', provinceID: '7', countryID: '1', cityID: "18"/* +city.sdmCityId */ };
        delete params.language;
        delete params.conceptID;
        delete params.menuTemplateID;
        console.log("PARAMS -> ", params);
        let listData: any = await SoapManager.requestData('GetWebAreasList', params),
            list = listData.GetWebAreasListResult;

        console.log("list --> ", listData);
        return;

        await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_CITY });

        for (let city of list) {
            // only save city with valid cityId
            if (city.CTY_ID !== "-1" && city.CTY_CNTID === "1") {
                let cityData = {
                    sdmCityId: parseInt(city.CTY_ID),
                    countryId: 'AE',
                    sdmCountryId: parseInt(city.CTY_CNTID),
                    cityName: city.CTY_NAME,
                    cityNameAr: city.CTY_NAMEUN
                };

                // save and insert data into database
                await Aerospike.put({
                    bins: cityData,
                    set: Constant.SET_NAME.SYNC_CITY,
                    key: cityData.sdmCityId,
                    createOrReplace: true
                });
            }
        }
    }


    console.log("\t# Area Sequence Complete");
}