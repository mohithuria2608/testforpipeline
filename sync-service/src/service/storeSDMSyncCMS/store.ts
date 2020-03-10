/** store sequence mapping */

import aerospike from "aerospike";
import * as Constant from "../../constant";
import { Aerospike } from "../../aerospike";
import { SoapManager, generateRandomString, commonParams } from "../../utils";

// let GeoJSON = aerospike.GeoJSON;

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetStoresList', params),
        list = await listData.GetStoresListResult.CC_STORE;

    await Aerospike.truncate({ set: 'sync_store_en' });

    for (let store of list) {
        // check if store is active
        if (store.STR_ISACTIVE === "true") {
            if (store.Fences && store.Locations) {
                for (let i = 0; i < store.Fences.CC_STORE_MAP_FENCE.length; i++) {
                    let areaDetail = await getAreaDetail(parseInt(store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID));
                    let saveData = {
                        storeId: 4,
                        language: "En",
                        cityId: "1",
                        sdmStoreId: store.STR_ID,
                        ...areaDetail,
                        menuId: parseInt(store.STR_WEB_MNUID),
                        areaId: parseInt(store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID),
                        streetId: parseInt(store.Fences.CC_STORE_MAP_FENCE[i].MAPF_STREETID),
                        districtId: parseInt(store.Fences.CC_STORE_MAP_FENCE[i].MAPF_DISTRICTID),
                        mapId: parseInt(store.Fences.CC_STORE_MAP_FENCE[i].MAPF_ID),
                        nameEn: store.STR_NAME || "",
                        nameAr: store.STR_NAMEUN || "",
                        phone1: store.STR_PHONE1 || "",
                        phone2: store.STR_PHONE2 || "",
                        services: getDiffServices(store.STR_SERVICES),
                        active: 1,
                        location: {
                            description: store.Locations.CC_STORE_MAP_LOCATION.MAPL_DESCRIPTION,
                            latitude: parseFloat(store.Locations.CC_STORE_MAP_LOCATION.MAPL_LATITUDE),
                            longitude: parseFloat(store.Locations.CC_STORE_MAP_LOCATION.MAPL_LONGITUDE),
                        },
                        addressEn: store.STR_ADDRESS || "",
                        addressAr: store.STR_ADDRESSUN || "",
                        geoFence: createGeoFence(
                            store.Fences.CC_STORE_MAP_FENCE[i].MAPF_LATITUDE,
                            store.Fences.CC_STORE_MAP_FENCE[i].MAPF_LONGITUDE
                        ),
                        startTime: store.STR_WH_STARTTIME,
                        endTime: store.STR_WH_ENDTIME,
                        "email": "",
                        "postcode": "1111",
                        "provinceId": "1",
                        "homeDelStatus": "1",
                        "pickupStatus": "1",
                        "takeawayStatus": "1",
                        "monStatus": "1",
                        "monOpen": "",
                        "monClose": "",
                        "tuesStatus": "",
                        "tuesOpen": "",
                        "tuesClose": "",
                        "wednesStatus": "",
                        "wednesOpen": "",
                        "wednesClose": "",
                        "thursStatus": "",
                        "thursOpen": "",
                        "thursClose": "",
                        "friStatus": "",
                        "friOpen": "",
                        "friClose": "",
                        "saturStatus": "",
                        "saturOpen": "",
                        "saturClose": "",
                        "sunStatus": "",
                        "sunOpen": "",
                        "sunClose": "",
                        "locationName": "",
                        "locationCode": "",
                        "gst": "",
                        "vat": "",
                        "isGlobal": "1",
                        "hdStatus": "1",
                        "puStatus": "1",
                        "taStatus": "1",
                        "workingHours": "8",
                        "geoAreaCode": "sasasa",
                        "geoCoords": "asasasa",
                    }

                    // save and insert data into database
                    await Aerospike.put({
                        bins: saveData,
                        set: Constant.SET_NAME.SYNC_STORE,
                        key: saveData.sdmStoreId,
                        createOrReplace: true
                    });
                }
            }
            // } else {
            //     let saveData = {
            //         id: Generator(),
            //         storeId: parseInt(store.STR_WEB_MNUID),
            //         // ...areaDetail,
            //         menuId: parseInt(store.STR_MENU_ID),
            //         areaId: parseInt(store.STR_MENU_ID),
            //         name_en: store.STR_NAME || "",
            //         name_ar: store.STR_NAMEUN || "",
            //         phone1: store.STR_PHONE1 || "",
            //         phone2: store.STR_PHONE2 || "",
            //         services: getDiffServices(store.STR_SERVICES),
            //         active: 1,
            //         location: {
            //             description: "",
            //             latitude: 0,
            //             longitude: 0,
            //         },
            //         address_en: store.STR_ADDRESS,
            //         address_ar: store.STR_ADDRESSUN,
            //         geoFence: {},
            //         startTime: new Date(store.STR_WH_STARTTIME),
            //         endTime: new Date(store.STR_WH_ENDTIME),
            //     };

            //     // save and insert data into database
            //     // let key = Aerospike.generateKey(collections.store, saveData.storeId);
            //     // await Aerospike.insert(key, saveData, { replacePolicy: true });
            //     finalJSON.push(saveData);
            // }
        }
    }
    // await Aerospike.exportData(collections.store);
    // await exportJSON('storeList', finalJSON);
    console.log("\t# Store Sequence Complete");
}

// returns the different services object
function getDiffServices(services: string) {
    if (typeof services === "string") {
        let diffServices = services.split(", ");
        return {
            del: diffServices.indexOf("Delivery") > -1 ? 1 : 0,
            tak: diffServices.indexOf("Takeout") > -1 ? 1 : 0,
            din: diffServices.indexOf("Dine-in") > -1 ? 1 : 0,
        }
    } else return { del: 0, tak: 0, din: 0 }
}

// gets the detail of the area from the database
async function getAreaDetail(areaId: number) {
    let area: any = await Aerospike.get({ set: Constant.SET_NAME.SYNC_AREA, key: areaId });
    return {
        countryId: area.countryId,
        provinceId: area.provinceId
    }
}

// creates geoFence
function createGeoFence(lats, longs) {
    let coords: any = [];
    lats = lats.split(',');
    longs = longs.split(',');
    for (let i = 0; i < lats.length; i++) {
        coords.push([parseFloat(longs[i]), parseFloat(lats[i])]);
    }
    coords.push(coords[0]);
    return {
        type: 'Polygon',
        coordinates: [coords]
    }
}