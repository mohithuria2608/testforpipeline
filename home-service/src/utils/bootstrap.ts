import { Aerospike } from "../aerospike";
import { homeController } from '../controllers';

export let bootstrap = async function (server) {

    await Aerospike.init();
    homeController.bootstrapHome()
    return
}