import { Aerospike } from "../aerospike";
import { homeController } from '../controllers';
import { configuration } from '../configuration';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await configuration.init({ bootstrap: true });;
    // homeController.bootstrapHome()

    return
}