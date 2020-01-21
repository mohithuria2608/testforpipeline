import { Mongo } from '../mongo'

export let bootstrap = async function (server) {
    await Mongo.init()
    return {}
}