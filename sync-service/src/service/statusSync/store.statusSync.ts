/** store status sequence mapping */
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetStoresList', params),
        storesList = await listData.GetStoresListResult.CC_STORE;

    let storeDataList = [];

    for (let store of storesList) {
        storeDataList.push({
            sdmStoreId: parseInt(store.STR_ID),
            active: 0
        });
    }

    return storeDataList;
}