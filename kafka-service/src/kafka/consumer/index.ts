import { failConsumerE } from './failure.consumer';

import { as_configConsumerE } from './as_config.consumer';
import { as_appversionConsumerE } from './as_appversion.consumer';

import { cms_menuConsumerE } from './cms_menu.consumer';
import { sdm_menuConsumerE } from './sdm_menu.consumer';
import { as_menuConsumerE } from './as_menu.consumer';
import { as_homeConsumerE } from './as_home.consumer';
import { as_locationConsumerE } from './as_location.consumer';

import { as_hiddenConsumerE } from './as_hidden.consumer';

import { sdm_userConsumerE } from './sdm_user.consumer';
import { cms_userConsumerE } from './cms_user.consumer';
import { as_userConsumerE } from './as_user.consumer';

import { sdm_addressConsumerE } from './sdm_address.consumer';
import { cms_addressConsumerE } from './cms_address.consumer';
import { as_addressConsumerE } from './as_address.consumer';

import { as_promotionConsumerE } from './as_promotion.consumer';

import { sdm_orderConsumerE } from './sdm_order.consumer';

import { m_loggerE } from './m_logger.consumer';
import { cms_locationConsumerE } from './cms_location.consumer';

import { ping_serviceE } from './ping_service.consumer';



export function initConsumers() {
    failConsumerE.handleMessage();

    as_configConsumerE.handleMessage();
    as_appversionConsumerE.handleMessage();
    
    as_userConsumerE.handleMessage();
    sdm_userConsumerE.handleMessage();
    cms_userConsumerE.handleMessage();

    sdm_addressConsumerE.handleMessage();
    cms_addressConsumerE.handleMessage();
    as_addressConsumerE.handleMessage();

    as_menuConsumerE.handleMessage();
    as_homeConsumerE.handleMessage();
    sdm_menuConsumerE.handleMessage();
    cms_menuConsumerE.handleMessage();

    as_locationConsumerE.handleMessage();
    cms_locationConsumerE.handleMessage();
    // as_storeConsumerE.handleMessage();

    as_hiddenConsumerE.handleMessage();

    as_promotionConsumerE.handleMessage();

    sdm_orderConsumerE.handleMessage();

    m_loggerE.handleMessage();

    ping_serviceE.handleMessage();
}