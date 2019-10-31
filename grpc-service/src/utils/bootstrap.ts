import { Aerospike } from '../databases'

export let bootstrap = async function (server) {

    await Aerospike.connect();

    return
}