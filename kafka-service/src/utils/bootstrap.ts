import { initConsumers } from '../kafka'
import { configuration } from '../configuration';

export let bootstrap = async function (server) {
    await configuration.init({ bootstrap: true });;
    initConsumers()
    return
}