import { mongoC, Aerospike } from '../databases'

export let bootstrap = async function (server) {
    await mongoC.mongoConnect(server);
    await Aerospike.connect();

    return
}