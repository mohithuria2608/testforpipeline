import { Aerospike } from "../databases/aerospike";
import { SDM } from "../sdm";

export let bootstrap = async function (server) {
    await Aerospike.init();
    await SDM.initClient()

    return {}
}