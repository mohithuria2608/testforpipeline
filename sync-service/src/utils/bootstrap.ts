import { Aerospike } from "../aerospike";
import { SoapManager } from "./soap";
import { cmsConfigController } from '../controllers';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await cmsConfigController.bootstrapConfiguration()
    await SoapManager.init();

    return
}