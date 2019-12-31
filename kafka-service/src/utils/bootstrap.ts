import { initConsumers } from '../kafka'

export let bootstrap = async function (server) {
    initConsumers()
    return
}