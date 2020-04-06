import { Aerospike } from "../aerospike";
import { SDM } from '../sdm'
import { configuration } from '../sync/configuration';
import { appversion } from '../sync/appversion';

export let bootstrap = async function (server) {
    await Aerospike.init();
    await configuration.init({ bootstrap: true });
    await appversion.init();
    await SDM.init();
    return {}
}