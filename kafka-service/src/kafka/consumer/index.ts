import { failConsumerE } from './failure.consumer';
import { userConsumerE } from './user.consumer';

export function initConsumers() {
    // failConsumerE.handleMessage();
    userConsumerE.handleMessage();
}