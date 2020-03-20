import { Aerospike } from "../aerospike";
import { countryController, cityController, areaController, storeController, locationController } from '../controllers';

export let bootstrap = async function (server) {
    await Aerospike.init();
    await countryController.bootstrapCountry()
    await cityController.bootstrapCity()
    await areaController.bootstrapArea()
    await storeController.bootstrapStore()
    locationController.bootstrapPickup()
    return {}
}