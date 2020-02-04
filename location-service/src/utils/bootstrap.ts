import { Aerospike } from "../aerospike";
import { countryController, cityController, areaController, storeController } from '../controllers';

export let bootstrap = async function (server) {
    await Aerospike.init();
    countryController.bootstrapCountry()
    cityController.bootstrapCity()
    areaController.bootstrapArea()
    // storeController.bootstrapStore()
    return {}
}