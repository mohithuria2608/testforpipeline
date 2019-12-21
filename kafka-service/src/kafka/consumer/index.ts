import { failConsumerE } from './failure.consumer';
import { sdm_userConsumerE } from './sdm_user.consumer';
import { cms_userConsumerE } from './cms_user.consumer';

export function initConsumers() {
    // failConsumerE.handleMessage();
    sdm_userConsumerE.handleMessage();
    cms_userConsumerE.handleMessage();
}