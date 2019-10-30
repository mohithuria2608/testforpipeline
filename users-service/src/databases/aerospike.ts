/**
 * @file aerospike
 * @description defines aerospike database methods
 * @created 2019-10-30 00:19:03
*/

const aerospike = require('aerospike');
import * as helper from '../utils'

class AerospikeClass {

    private client;

    constructor() { }

    /** connects to aerospike database */
    async connect() {
        if (!this.client) { // only init if client not already initialized
            try {
                this.client = await aerospike.connect({ hosts: 'localhost:3000' });
                if (this.client)
                    helper.consolelog('Aerospike Client Connected', "", true)
            } catch (err) { helper.consolelog('Error in Aerospike Connection', err, false) }
        } else throw Error('AEROSPIKE -> Client already initialized');
    }

    /**
     * insert into database
     * @param keyData - key object data
     * @param payload - payload data
     */
    async insertData(key: any, payload: any, options?: any) {
        return new Promise((resolve, reject) => {
            if (this.client) { // if client is initialized
                let metaOption: any = {}, policy = {};
                if (options.ttl) metaOption.ttl = options.ttl;
                if (options.replacePolicy) { // add a replace policy
                    policy = new aerospike.WritePolicy({ exists: aerospike.policy.exists.CREATE_OR_REPLACE });
                }
                // insert the data into aerospike database based on the key
                this.client.put(key, payload, metaOption, policy, function (err) {
                    if (err) { helper.consolelog('Error in Insert Aerospike', err, false) }
                    else resolve(true);
                });
            } else reject('AEROSPIKE -> Client not initialized');
        });
    }

    /**
     * deletes record from database
     * @param key - key data
     */
    async removeData(key: any) {
        return new Promise((resolve, reject) => {
            if (this.client) { // if client is initialized
                // remove the data based on the key
                this.client.remove(key, function (err) {
                    if (err) { helper.consolelog('Error in Delete Aerospike', err, false) }
                    else resolve(true);
                });
            } else reject('AEROSPIKE -> Client not initialized');
        });
    }

    /**
     * generates a new key
     * @param setName - name of database set
     * @param keyName - the primary key name
     */
    generateKey(setName: string, keyName: string) {
        return new aerospike.Key('americana', setName, keyName);
    }
}

export const Aerospike = new AerospikeClass();