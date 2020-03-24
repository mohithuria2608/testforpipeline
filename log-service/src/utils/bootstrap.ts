import { Mongo } from '../mongo';
import { configuration } from '../configuration';

export let bootstrap = async function (server) {
    await configuration.init({ bootstrap: true });;
    await Mongo.init()
    return {}
}