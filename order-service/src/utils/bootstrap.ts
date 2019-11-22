import Aerospike from "../databases/aerospike";

export let bootstrap = async function (server) {

    await Aerospike.init();

    return
}