import { Aerospike } from "../aerospike";
import { Mongo } from '../mongo'
import { SDM } from "../sdm";
import { configuration } from '../sync-config/configuration';
import { appversion } from '../sync-config/appversion';
import * as ENTITY from '../entity'
import { job } from '../lib';

export let bootstrap = async function (server) {
    await Mongo.init()
    await Aerospike.init();
    await ENTITY.OrderstatusE.bootstrapOrderstatuscron()
    await configuration.init({ bootstrap: true });
    await appversion.init();;
    await SDM.init()
    await job.start();
    return
}