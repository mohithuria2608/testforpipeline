/** city sequence mapping */

import { Aerospike } from "../../aerospike";
import { SoapManager, generateRandomString, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetCitiesList', params),
        list = await listData.GetCitiesListResult.CC_CITY;


    await Aerospike.truncate({ set: 'sync_city' });

    for (let city of list) {
        // only save city with valid cityId
        if (city.CTY_ID !== "-1") {
            let saveData = {
                id: generateRandomString(16),
                cityId: parseInt(city.CTY_ID),
                countryId: parseInt(city.CTY_CNTID),
                name_en: city.CTY_NAME,
                name_ar: city.CTY_NAMEUN
            };

            // save and insert data into database
            await Aerospike.put({
                bins: saveData,
                set: 'sync_city',
                key: saveData.id,
                createOrReplace: true
            });
        }
    }
    console.log("\t# City Sequence Complete");
}