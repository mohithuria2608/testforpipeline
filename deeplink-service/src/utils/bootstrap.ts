import { configuration } from '../sync-config/configuration';
import { appversion } from '../sync-config/appversion';

export let bootstrap = async function (server) {

    await configuration.init({ bootstrap: true });
    await appversion.init();

    return
}