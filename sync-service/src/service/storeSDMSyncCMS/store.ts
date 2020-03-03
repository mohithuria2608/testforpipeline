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
                    // let areaDetail = await getAreaDetail(parseInt(store.Fences.CC_STORE_MAP_FENCE[i].MAPF_AREAID));
                    let saveData = {
                        name: store.STR_NAME || "",
                        sdm_storeid: store.STR_ID,
                        store_id: "1",
                        menuId: parseInt(store.STR_WEB_MNUID),
                        latitude: parseFloat(store.Locations.CC_STORE_MAP_LOCATION.MAPL_LATITUDE),
                        longitude: parseFloat(store.Locations.CC_STORE_MAP_LOCATION.MAPL_LONGITUDE),
                        email: 'test@mail.com',
                        phone_one: store.STR_PHONE1 || "",
                        phone_two: store.STR_PHONE2 || "",
                        working_hours: 3,
                        geofence_type: 3,
                        geofence_area_code: 3,
                        description: 'Some description',
                        address: store.STR_ADDRESS || "",
                        geofence_coordinates: "55.3366541862488,25.2316916616407;55.3373193740845,25.2311287579901",
                        os_home_delivery: "0",
                        os_pick_up: "0",
                        os_take_away: "1",
                        map_id: "123",
                        language: "1",
                        city: "2",
                        country: "IND",
                        region: "2",
                        start_date: "",
                        end_date: "",
                        status: "1",
                        is_global: "1",
                        home_delivery_status: "1",
                        pickup_status: "1",
                        takeaway_status: "0",
                        monday_status: "0",
                        monday_open: "10:00 pm",
                        monday_close: "10:00 pm",
                        tuesday_status: "1",
                        tuesday_open: "10:00 pm",
                        tuesday_close: "10:00 pm",
                        wednesday_status: "0",
                        wednesday_open: "10:00 pm",
                        wednesday_close: "10:00 pm",
                        thursday_status: "1",
                        thursday_open: "10:00 pm",
                        thursday_close: "10:00 pm",
                        friday_status: "0",
                        friday_open: "10:00 pm",
                        friday_close: "10:00 pm",
                        saturday_status: "1",
                        saturday_open: "10:00 pm",
                        saturday_close: "10:00 pm",
                        sunday_status: "0",
                        sunday_open: "10:00 pm",
                        sunday_close: "10:00 pm",
                        location_name: "location name",
                        location_code: "location code",
                        gst: "gst",
                        vat: "vat"
                    }

                    // save and insert data into database
                    await Aerospike.put({
                        bins: saveData,
                        set: Constant.SET_NAME.SYNC_STORE_EN,
                        key: saveData.sdm_storeid,
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
    let area: any = await Aerospike.get({ set: 'sync_area', key: areaId });
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