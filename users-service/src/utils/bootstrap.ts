import { Aerospike } from "../aerospike";
import { Mongo } from '../mongo'
import { SDM } from '../sdm'
import { configuration } from '../configuration';
import { appversion } from '../appversion';

export let bootstrap = async function (server) {
    await Mongo.init()
    await Aerospike.init();
    await configuration.init();
    await appversion.init();
    await SDM.init();
    return {}
}