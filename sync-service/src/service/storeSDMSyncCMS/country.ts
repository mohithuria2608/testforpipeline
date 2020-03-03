/** country sequence mapping */

import { Aerospike } from "../../aerospike";
import * as Constant from "../../constant";
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetCountriesList', params),
        list = await listData.GetCountriesListResult.CC_COUNTRY;

    await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_COUNTRY });

    for (let country of list) {
        // only save country with valid countryId
        if (country.CNT_ID !== "-1") {
            let saveData = {
                sdmCountryId: country.CNT_ID,
                countryName: country.CNT_NAME || "",
                countryNameAr: country.CNT_NAMEUN || ""
            };

            // save and insert data into database
            await Aerospike.put({
                bins: saveData,
                set: Constant.SET_NAME.SYNC_COUNTRY,
                key: saveData.sdmCountryId,
                createOrReplace: true
            });
        }
    }
    console.log("\t# Country Sequence Complete");
}