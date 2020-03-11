import { Aerospike } from "../aerospike";
import { promotionController } from '../controllers';

export let bootstrap = async function (server) {

    await Aerospike.init();
    /**
     * @description Bootstrap promotions
     */
    // promotionController.postPromotion();
    return
}