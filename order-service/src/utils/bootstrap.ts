import { Aerospike } from "../aerospike";
import { Mongo } from '../mongo'
import { SDM } from "../sdm";
import { orderController } from '../controllers';

export let bootstrap = async function (server) {
    
    await Mongo.init()

    await Aerospike.init();

    await SDM.init()

    await orderController.bootstrapPendingOrders()
    return
}