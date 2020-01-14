import { Aerospike } from "../aerospike";

export let bootstrap = async function (server) {
    await Aerospike.init();
    return {}
}