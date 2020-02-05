import { Aerospike } from "../aerospike";
import { Mongo } from '../mongo'
import { SDM } from "../sdm";

export let bootstrap = async function (server) {
    
    await Mongo.init()

    await Aerospike.init();

    await SDM.initClient()

    return
}