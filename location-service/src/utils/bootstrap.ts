import { Aerospike } from "../aerospike";
import { countryController, cityController, areaController, storeController, locationController } from '../controllers';
import { configuration } from '../configuration';
import * as ENTITY from "../entity";
import * as fs from "fs";

export let bootstrap = async function (server) {
    await Aerospike.init();
    await configuration.init({ bootstrap: true });;
    // await countryController.bootstrapCountry()
    // await cityController.bootstrapCity()
    // await areaController.bootstrapArea()
    // await storeController.bootstrapStore()
    // locationController.bootstrapPickup()
    // fs.writeFileSync('storeList_uat.json',JSON.stringify(await ENTITY.StoreE.getAllStores()))
    return {}
}