import { failConsumerE } from './failure.consumer';
import { cms_menuConsumerE } from './cms_menu.consumer';
import { sdm_menuConsumerE } from './sdm_menu.consumer';
import { as_menuConsumerE } from './as_menu.consumer';

import { as_upsellConsumerE } from './as_upsell.consumer';

import { sdm_userConsumerE } from './sdm_user.consumer';
import { cms_userConsumerE } from './cms_user.consumer';
import { as_userConsumerE } from './as_user.consumer';

import { as_promotionConsumerE } from './as_promotion.consumer';

export function initConsumers() {
    // failConsumerE.handleMessage();
    // sdm_userConsumerE.handleMessage();
    // cms_userConsumerE.handleMessage();
    // cms_menuConsumerE.handleMessage();
    as_promotionConsumerE.handleMessage();
}