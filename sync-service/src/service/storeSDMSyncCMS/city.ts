/** city sequence mapping */

import { Aerospike } from "../../aerospike";
import * as Constant from "../../constant";
import { SoapManager, generateRandomString, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetCitiesList', params),
        list = await listData.GetCitiesListResult.CC_CITY;


    await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_CITY });

    for (let city of list) {
        // only save city with valid cityId
        if (city.CTY_ID !== "-1") {
            let cityData = {
                sdmCityId: parseInt(city.CTY_ID),
                countryId: parseInt(city.CTY_CNTID),
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
    console.log("\t# City Sequence Complete");
}