import { Aerospike } from "../aerospike";
import { configuration } from '../sync-config/configuration';
import { appversion } from '../sync-config/appversion';

export let bootstrap = async function (server) {
    await Aerospike.init();
    await configuration.init({ bootstrap: true });
    await appversion.init();
    // await countryController.bootstrapCountry()
    // await cityController.bootstrapCity()
    // await areaController.bootstrapArea()
    // await storeController.bootstrapStore()
    // locationController.bootstrapPickup()
    // fs.writeFileSync('storeList_uat.json',JSON.stringify(await ENTITY.StoreE.getAllStores()))
    return {}
}