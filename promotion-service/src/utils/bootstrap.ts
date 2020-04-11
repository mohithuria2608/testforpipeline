import { Aerospike } from "../aerospike";
import { promotionController } from '../controllers';
import { configuration } from '../sync-config/configuration';
import { appversion } from '../sync-config/appversion';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await configuration.init({ bootstrap: true });
    await appversion.init();;
    
    /**
     * @description Bootstrap promotions
     */
    // promotionController.postPromotion();
    return
}