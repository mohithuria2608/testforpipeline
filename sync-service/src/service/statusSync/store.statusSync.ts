/** store status sequence mapping */
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetStoresList', params),
        storesList = await listData.GetStoresListResult.CC_STORE;

    let invalidStores = ['1240', '1067'];
    let storeDataList = [];

    for (let store of storesList) {
        if (!invalidStores.includes(store.STR_ID)) {
            storeDataList.push({
                sdmStoreId: parseInt(store.STR_ID),
                active: store.STR_ACTIVE === "true" ? 1 : 0
            });
        }
    }

    return storeDataList;
}