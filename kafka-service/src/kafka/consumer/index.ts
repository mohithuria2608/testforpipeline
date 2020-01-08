import { failConsumerE } from './failure.consumer';
import { sdm_userConsumerE } from './sdm_user.consumer';
import { cms_userConsumerE } from './cms_user.consumer';
import { cms_menuConsumerE } from './cms_menu.consumer';
import { cms_promotionConsumerE } from './cms_promotion.consumer';

export function initConsumers() {
    // failConsumerE.handleMessage();
    // sdm_userConsumerE.handleMessage();
    // cms_userConsumerE.handleMessage();
    // cms_menuConsumerE.handleMessage();
    cms_promotionConsumerE.handleMessage();
}