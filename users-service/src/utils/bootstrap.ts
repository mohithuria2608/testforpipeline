import { Aerospike } from "../aerospike";
import { SDM } from '../sdm'
import { configuration } from '../configuration';

export let bootstrap = async function (server) {
    await Aerospike.init();
    await configuration.init();
    await SDM.init()
    return {}
}