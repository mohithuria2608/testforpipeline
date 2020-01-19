import { Aerospike } from "../aerospike";
import { Mongo } from '../mongo'

export let bootstrap = async function (server) {
    
    await Mongo.init()

    await Aerospike.init();

    return
}