import { Aerospike } from "../aerospike";
import { menuController, hiddenController } from '../controllers';
import { configuration } from '../configuration';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await configuration.init({ bootstrap: true });;
    // menuController.bootstrapMenu()
    // hiddenController.bootstrapHidden()
    return
}