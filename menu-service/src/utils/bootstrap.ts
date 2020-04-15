import { Aerospike } from "../aerospike";
import { menuController, hiddenController } from '../controllers';
import { configuration } from '../sync-config/configuration';
import { appversion } from '../sync-config/appversion';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await configuration.init({ bootstrap: true });
    await appversion.init();
    // menuController.bootstrapMenu()
    // hiddenController.bootstrapHidden()
    return
}