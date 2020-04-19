import { Mongo } from '../mongo'
import { Aerospike } from "../aerospike";
import { SDM } from '../sdm'
import { configuration } from '../sync-config/configuration';
import { appversion } from '../sync-config/appversion';

export let bootstrap = async function (server) {
    await Mongo.init()
    await Aerospike.init();
    await configuration.init({ bootstrap: true });
    await appversion.init();
    await SDM.init();
    return {}
}