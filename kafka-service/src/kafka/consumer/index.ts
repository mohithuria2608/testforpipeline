import { failConsumerE } from './failure.consumer';

import { as_configConsumerE } from './as_config.consumer';

import { cms_menuConsumerE } from './cms_menu.consumer';
import { sdm_menuConsumerE } from './sdm_menu.consumer';
import { as_menuConsumerE } from './as_menu.consumer';

import { as_upsellConsumerE } from './as_upsell.consumer';

import { sdm_userConsumerE } from './sdm_user.consumer';
import { cms_userConsumerE } from './cms_user.consumer';
import { as_userConsumerE } from './as_user.consumer';

import { as_promotionConsumerE } from './as_promotion.consumer';

import { sdm_orderConsumerE } from './sdm_order.consumer';

import { m_loggerE } from './m_logger.consumer';




export function initConsumers() {
    failConsumerE.handleMessage();

    as_configConsumerE.handleMessage();

    as_userConsumerE.handleMessage();
    sdm_userConsumerE.handleMessage();
    cms_userConsumerE.handleMessage();

    as_menuConsumerE.handleMessage();
    sdm_menuConsumerE.handleMessage();
    // cms_menuConsumerE.handleMessage();

    // as_upsellConsumerE.handleMessage();

    // as_promotionConsumerE.handleMessage();

    // as_promotionConsumerE.handleMessage();

    // sdm_orderConsumerE.handleMessage();

    m_loggerE.handleMessage();
}