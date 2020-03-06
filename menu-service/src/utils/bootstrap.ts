import { Aerospike } from "../aerospike";
import { menuController, hiddenController } from '../controllers';

export let bootstrap = async function (server) {

    await Aerospike.init();
    // menuController.bootstrapMenu()
    // hiddenController.bootstrapHidden()
    return
}