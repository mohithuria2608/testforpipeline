import { Aerospike } from "../aerospike";
import { SoapManager } from "./soap";

export let bootstrap = async function (server) {

    await Aerospike.init();
    await SoapManager.initClient();

    return
}