import { configuration } from '../sync-config/configuration';

export let bootstrap = async function (server) {
    await configuration.init({ bootstrap: true });
    return {}
}