/**
 * @file aerospike
 * @description defines aerospike database methods
 * @created 2019-10-30 00:19:03
*/

const aerospike = require('aerospike');
import { consolelog } from '../utils'

export class AerospikeClass {

    protected client;

    constructor() { }

    /** connects to aerospike database */
    async connect() {
        if (!this.client) { // only init if client not already initialized
            try {
                this.client = await aerospike.connect({ hosts: 'localhost:3000' });
                if (this.client)
                    consolelog('Aerospike Client Connected', "", true)
            } catch (err) { consolelog('Error in Aerospike Connection', err, false) }
        } else throw Error('AEROSPIKE -> Client already initialized');
    }
}

export const Aerospike = new AerospikeClass();