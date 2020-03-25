import { Aerospike } from "../aerospike";
import { promotionController } from '../controllers';
import { configuration } from '../configuration';

export let bootstrap = async function (server) {

    await Aerospike.init();
    await configuration.init({ bootstrap: true });;
    
    /**
     * @description Bootstrap promotions
     */
    // promotionController.postPromotion();
    return
}