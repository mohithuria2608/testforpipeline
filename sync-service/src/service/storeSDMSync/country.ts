/** country sequence mapping */

import { Aerospike } from "../../aerospike";
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetCountriesList', params),
        list = await listData.GetCountriesListResult.CC_COUNTRY;

    await Aerospike.truncate({ set: 'sync_country' });

    for (let country of list) {
        // only save country with valid countryId
        if (country.CNT_ID !== "-1") {
            let saveData = {
                countryId: country.CNT_ID,
                name_en: country.CNT_NAME || "",
                name_ar: country.CNT_NAMEUN || ""
            };

            // save and insert data into database
            await Aerospike.put({
                bins: saveData,
                set: 'sync_country',
                key: saveData.countryId,
                createOrReplace: true
            });
        }
    }
    console.log("\t# Country Sequence Complete");
}