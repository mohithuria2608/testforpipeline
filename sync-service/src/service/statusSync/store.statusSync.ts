/** store status sequence mapping */
import * as Constant from "../../constant";
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetStoresList', params),
        storesList = await listData.GetStoresListResult.CC_STORE;

    let storeDataList = [];

    for (let store of storesList) {
        storeDataList.push({
            sdmStoreId: parseInt(store.STR_ID),
            active: store.STR_ISACTIVE === "true" ? 1 : 0,
            ...getStoreTimings(store.STR_WH_STARTTIME, store.STR_WH_ENDTIME, store.STR_WH_NEXT_DAY),
        });
    }

    return storeDataList;
}

// returns the store timings
function getStoreTimings(st, et, nextday) {
    st += 'Z'; et += 'Z';
    return {
        startTime: new Date(+new Date(st) - Constant.CONF.GENERAL.SDM_STORE_TIME_OFFSET).toISOString(),
        endTime: new Date(+new Date(et) - Constant.CONF.GENERAL.SDM_STORE_TIME_OFFSET).toISOString(),
        nextDay: parseInt(nextday) ? 1 : 0
    }
}