import { mongoC } from '../databases'

export let bootstrap = async function (server) {
    await mongoC.mongoConnect(server)
    return
}