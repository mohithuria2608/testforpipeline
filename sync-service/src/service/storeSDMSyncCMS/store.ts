/** store sequence mapping */

import * as Constant from "../../constant";
import { Aerospike } from "../../aerospike";
import { SoapManager, commonParams } from "../../utils";

export default async function () {

    let params = { ...commonParams },
        listData: any = await SoapManager.requestData('GetStoresList', params),
        storesList = await listData.GetStoresListResult.CC_STORE;

    await Aerospike.truncate({ set: Constant.SET_NAME.SYNC_STORE });
    let invalidStores = ['1240', '1067'];
    for (let store of storesList) {
        if (store.STR_ISACTIVE === "true" && !invalidStores.includes(store.STR_ID)) {
            let storeData = {
                storeId: 1,
                language: 1,
                sdmStoreId: parseInt(store.STR_ID),
                menuId: 17,
                webMenuId: 1,
                location: {
                    description: store.Locations.CC_STORE_MAP_LOCATION.MAPL_DESCRIPTION,
                    latitude: parseFloat(store.Locations.CC_STORE_MAP_LOCATION.MAPL_LATITUDE),
                    longitude: parseFloat(store.Locations.CC_STORE_MAP_LOCATION.MAPL_LONGITUDE),
                },
                nameEn: store.STR_NAME || "",
                nameAr: store.STR_NAMEUN || "",
                phone1: store.STR_PHONE1 || "",
                phone2: store.STR_PHONE2 || "",
                addressEn: store.STR_ADDRESS || "",
                addressAr: store.STR_ADDRESSUN || "",
                services: getServices(store.STR_SERVICES, store.Fences),
                ...getStoreTimings(store.STR_WH_STARTTIME, store.STR_WH_ENDTIME, parseInt(store.STR_WH_NEXT_DAY)),
                email: "",
                postcode: -1,
                homeDelStatus: 1,
                pickupStatus: 1,
                takeawayStatus: 1,
                monStatus: "1",
                monOpen: "",
                monClose: "",
                tuesStatus: "",
                tuesOpen: "",
                tuesClose: "",
                wednesStatus: "",
                wednesOpen: "",
                wednesClose: "",
                thursStatus: "",
                thursOpen: "",
                thursClose: "",
                friStatus: "",
                friOpen: "",
                friClose: "",
                saturStatus: "",
                saturOpen: "",
                saturClose: "",
                sunStatus: "",
                sunOpen: "",
                sunClose: "",
                locationName: "",
                locationCode: "",
                gst: "",
                vat: "",
                isGlobal: "1",
                workingHours: "",
                geoFenceAll: [],
                geoFence: {
                    type: 'Polygon',
                    coordinates: []
                }
            }

            if (store.Fences) {
                let geoFenceAllHash: any = {};
                for (let i = 0; i < store.Fences.CC_STORE_MAP_FENCE.length; i++) {
                    if (geoFenceAllHash[store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID]) {
                        geoFenceAllHash[store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID].latitude += ',' + geoFenceAllHash[store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID].latitude;
                        geoFenceAllHash[store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID].longitude += ',' + geoFenceAllHash[store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID].longitude;
                    } else {
                        geoFenceAllHash[store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID] = {
                            areaId: parseInt(store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID),
                            description: store.Fences.CC_STORE_MAP_FENCE[i].MAPF_DESCRIPTION || "",
                            districtId: -1,
                            mapId: store.Fences.CC_STORE_MAP_FENCE[i].MAPF_ID,
                            latitude: store.Fences.CC_STORE_MAP_FENCE[i].MAPF_LATITUDE,
                            longitude: store.Fences.CC_STORE_MAP_FENCE[i].MAPF_LONGITUDE,
                            streetId: -1
                        }
                    }
                }

                // push the final generated data into geoFence
                for (let geoFenceData in geoFenceAllHash) {
                    storeData.geoFenceAll.push(geoFenceAllHash[geoFenceData]);
                    storeData.geoFence.coordinates.push(createGeoFence(geoFenceAllHash[geoFenceData].latitude, geoFenceAllHash[geoFenceData].longitude));
                }
            }

            // insert data into aerospike
            await Aerospike.put({
                bins: storeData,
                set: Constant.SET_NAME.SYNC_STORE,
                key: storeData.sdmStoreId,
                createOrReplace: true
            });
        }
    }
}

// returns the different services object
function getServices(serviceString: string, fencesData: any) {
    if (typeof serviceString === "string") {
        let services = serviceString.split(", ");
        return {
            del: (services.indexOf("Delivery") > -1 && fencesData) ? 1 : 0,
            tak: services.indexOf("Takeout") > -1 ? 1 : 0,
            din: services.indexOf("Dine-in") > -1 ? 1 : 0,
        }
    } else {
        if (fencesData) return { del: 1, tak: 1, din: 1 }
        else return { del: 0, tak: 1, din: 1 }
    }
}

// returns the store timings
function getStoreTimings(st, et, nextDay) {
    st += 'Z'; et += 'Z';
    return {
        startTime: +new Date(st) - +new Date(st).setUTCHours(0, 0, 0),
        endTime: +new Date(et) - +new Date(et).setUTCHours(0, 0, 0),
        nextDay: nextDay
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
    return coords;
}