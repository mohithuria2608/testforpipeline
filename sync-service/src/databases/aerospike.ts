/**
 * @file aerospike.database
 * @description defines aerospike connection and operations
 * @created 2019-11-04 16:58:03
*/

const aerospike = require('aerospike');

class AerospikeClass {

    private client: any;
    private dbName: string;

    constructor(dbName: string) {
        this.dbName = dbName;
    }

    /** initializes client instance */
    async init() {
        if (!this.client) {
            try {
                this.client = await aerospike.connect({
                    hosts: 'localhost:3000'
                });
                if (this.client) {
                    console.log("> Aerospike Client Connected");
                }
            } catch (err) { console.log("ERROR IN AEROSPIKE -> ", err); }
        } else throw Error('Client already initialized');
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
     * reads from the database
     * @param keyData - key object data
     */
    async read(key: any) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.get(key, function (err, data) {
                    if (err) { console.log("READ ERROR -> ", err); reject(err); }
                    else resolve(data);
                });
            } else reject('Client not initialized');
        });
    }

    /**
     * scans a namespace
     * @param keyData - key object data
     */
    async scan(set: string) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                let scan = this.client.scan(this.dbName, set, { concurrent: true, nobins: false }),
                    stream = scan.foreach(),
                    tempData: any = [];
                stream.on('data', function (record) { tempData.push(record); });
                stream.on('error', function (error) { reject(error); });
                stream.on('end', function () {
                    let records: any = [];
                    for (let item of tempData) {
                        records.push(item.bins);
                    }
                    resolve(records);
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
     * creates an index
     */
    async createIndex(set, bin, index) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.createIntegerIndex({ ns: this.dbName, set, bin, index }, function (err, job) {
                    if (err) { console.log("INDEX ERROR -> ", err); reject(err); }
                    else {
                        // wait for index creation to complete
                        let pollInterval = 100;
                        job.waitUntilDone(pollInterval, (error) => {
                            if (error) { console.log("INDEX ERROR -> ", error); reject(error); }
                            console.log('Secondary index %s on %s was created successfully', index, bin);
                            resolve();
                        });
                    }
                });
            } else reject('Client not initialized');
        });
    }

    /**
     * removes an index
     */
    async removeIndex(indexName: string) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.indexRemove(this.dbName, indexName, function (err, job) {
                    if (err) { console.log("INDEX Remove ERROR -> ", err); reject(err); }
                    else resolve();
                });
            } else reject('Client not initialized');
        });
    }

    /**
     * generates a new key
     * @param setName - name of database set
     * @param keyName - the primary key name
     */
    generateKey(setName: string, keyName: any) {
        return new aerospike.Key(this.dbName, setName, keyName);
    }
}

export const Aerospike = new AerospikeClass('americana');