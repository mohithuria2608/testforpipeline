import { Aerospike } from "../aerospike";
import { SoapManager } from "./soap";
import { cmsConfigController, cmsAppversionController } from '../controllers';
import { configuration } from '../configuration';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await cmsConfigController.bootstrapConfiguration();
    await configuration.init({ bootstrap: true });;
    await cmsAppversionController.bootstrapAppversion()
    await SoapManager.init();

    return
}