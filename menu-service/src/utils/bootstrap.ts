import { Aerospike } from "../aerospike";
import { menuController, upsellController } from '../controllers';

export let bootstrap = async function (server) {

    await Aerospike.init();
    menuController.bootstrapMenu()
    upsellController.bootstrapUpsell()
    return
}