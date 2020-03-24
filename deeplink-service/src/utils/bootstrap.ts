// import { Aerospike } from "../databases/aerospike";
import { configuration } from '../configuration';

export let bootstrap = async function (server) {

    // await Aerospike.init();
    await configuration.init({ bootstrap: true });;

    return
}