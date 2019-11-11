/**
 * @file aerospike
 * @description defines aerospike database methods
 * @created 2019-10-30 00:19:03
*/

const aerospike = require('aerospike');
import { consolelog } from '../utils'

export class AerospikeClass {

    protected client;
    private dbName: string;

    constructor(dbName: string) {
        this.dbName = dbName;
    }

    /** connects to aerospike database */
    async init() {
        if (!this.client) { // only init if client not already initialized
            try {
                this.client = await aerospike.connect({ hosts: 'localhost:3000' });
                if (this.client)
                    consolelog('Aerospike Client Connected', "", true)
            } catch (err) { consolelog('Error in Aerospike Connection', err, false) }
        } else throw Error('AEROSPIKE -> Client already initialized');
    }

    /** registers user defined functions on aerospike client */
    async registerUFD(scriptPath: string) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.udfRegister(scriptPath, function (err) {
                    if (err) reject(err);
                    else console.log("UFD registered successfully");
                })
            } else reject('Client not initialized');
        });
    }

    /**
     * insert into database
     * @param keyData - key object data
     * @param payload - payload data
     */
    async insert(key: any, payload: any, options?: any) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                let metaOption: any = {}, policy = {};
                if (options.ttl) metaOption.ttl = options.ttl;
                if (options.replacePolicy) {
                    policy = new aerospike.WritePolicy({ exists: aerospike.policy.exists.CREATE_OR_REPLACE });
                }
                this.client.put(key, payload, metaOption, policy, function (err) {
                    if (err) { console.log("INSERT ERROR -> ", err); reject(err); }
                    else resolve(true);
                });

            } else reject('Client not initialized');
        });
    }

    /**
     * deletes record from database
     * @param key - key data
     */
    async remove(key: any) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.remove(key, function (err) {
                    if (err) { console.log("DELETE ERROR -> ", err); reject(err); }
                    else resolve(true);
                });

            } else reject('Client not initialized');
        });
    }


    /**
     * truncates a set
     */
    async truncate(set: string) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.truncate(this.dbName, set, function (err) {
                    if (err) { console.log("TRUNCATE ERROR -> ", err); reject(err); }
                    else resolve(true);
                });
            } else reject('Client not initialized');
        });
    }

    /**
     * generates a new key
     * @param setName - name of database set
     * @param keyName - the primary key name
     */
    generateKey(setName: string, keyName: string) {
        return new aerospike.Key(this.dbName, setName, keyName);
    }
}

export default new AerospikeClass('myapp');
