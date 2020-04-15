import { Aerospike } from "../aerospike";
import { SoapManager } from "./soap";
import { cmsConfigController, cmsAppversionController } from '../controllers';
import { configuration } from '../sync-config/configuration';
import { appversion } from '../sync-config/appversion';
import { storejob, storestatusjob_0_4, storestatusjob_10_24 } from '../lib';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await cmsConfigController.bootstrapConfiguration();
    await configuration.init({ bootstrap: true });
    await appversion.init();
    await cmsAppversionController.bootstrapAppversion()
    await SoapManager.init();
    storejob.start();
    storestatusjob_0_4.start();
    storestatusjob_10_24.start();
    return
}