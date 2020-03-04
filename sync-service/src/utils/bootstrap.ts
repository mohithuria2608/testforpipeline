import { Aerospike } from "../aerospike";
import { SoapManager } from "./soap";
import { cmsConfigController, cmsAppversionController } from '../controllers';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await cmsConfigController.bootstrapConfiguration();
    await cmsAppversionController.bootstrapAppversion()
    await SoapManager.init();

    return
}