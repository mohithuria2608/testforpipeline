import { entityConsumerE } from './create_token.consumer';

export function initConsumers() {
    entityConsumerE.handleMessage();
}