import { Aerospike } from "../aerospike";
import { Mongo } from '../mongo'
import { SDM } from "../sdm";
import { configuration } from '../configuration';
import { job } from '../lib';

export let bootstrap = async function (server) {
    
    await Mongo.init()

    await Aerospike.init();
    
    await configuration.init({ bootstrap: true });;

    await SDM.init()

    await job.start();
    return
}