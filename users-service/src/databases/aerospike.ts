/**
 * @file aerospike.database
 * @description defines aerospike connection and operations
 * @created 2019-11-04 16:58:03
*/

import * as config from "config"
const aerospike = require('aerospike');
const op = aerospike.operations
const lists = aerospike.lists;
const map = aerospike.maps;
const path = require('path');

class AerospikeClass {

    public client: any;
    public namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    /** initializes client instance */
    async init() {
        return new Promise(async (resolve, reject) => {
            if (!this.client) {
                try {
                    const defaultPolicy = {
                        totalTimeout: 1000
                    }
                    let aerospikeConfig = {
                        hosts: 'localhost:3000,localhost:3001',//config.get("aerospike.hosts"),
                        username: config.get("aerospike.username") != "" ? config.get("aerospike.username") : undefined,
                        password: config.get("aerospike.password") != "" ? config.get("aerospike.password") : undefined,
                        modlua: {
                            userPath: path.normalize(path.join(__dirname, '../..', 'lua'))
                        },
                        policies: {
                            apply: defaultPolicy,
                            batch: defaultPolicy,
                            info: defaultPolicy,
                            operate: defaultPolicy,
                            query: defaultPolicy,
                            read: defaultPolicy,
                            remove: defaultPolicy,
                            scan: defaultPolicy,
                            write: defaultPolicy,
                        },
                    }
                    this.client = await aerospike.connect(aerospikeConfig);
                    if (this.client) {
                        console.log("> Aerospike Client Connected");
                    }
                } catch (err) {
                    console.log("ERROR IN AEROSPIKE -> ", err);
                    reject(err)
                }
            } else reject(Error('Client already initialized'))
        })
    }

    private buildMeta(argv: IAerospike.Put) {
        const meta = {}
        if (argv.ttl) {
            meta['ttl'] = argv.ttl
        }
        return meta
    }

    private buildPolicy(argv: IAerospike.Put) {
        const policy = {}
        if (argv.create) {
            policy['exists'] = aerospike.policy.exists.CREATE
        }
        if (argv.replace) {
            policy['exists'] = aerospike.policy.exists.REPLACE
        }
        if (argv.update) {
            policy['exists'] = aerospike.policy.exists.UPDATE
        }
        return policy
    }

    private selectBins(query, argv: IAerospike.Query) {
        if (argv.bins) {
            query.select(argv.bins)
        }
        return query
    }

    private applyFilter(query, argv: IAerospike.Query) {
        if (argv.equal) {
            const filter = argv.equal
            const bin = filter.bin
            const value = filter.value
            query.where(aerospike.filter.equal(bin, value))
        } else if (argv.range) {
            const filter = argv.range
            const bin = filter.bin
            const start = filter.start
            const end = filter.end
            query.where(aerospike.filter.range(bin, start, end))
        } else if (argv.geoWithinRadius) {
            const filter = argv.geoWithinRadius
            const bin = filter.bin
            const lng = filter.lng
            const lat = filter.lat
            const radius = filter.radius
            query.where(aerospike.filter.geoWithinRadius(bin, lng, lat, radius))
        }
        return query
    }

    async  indexCreate(argv) {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    ns: this.namespace,
                    set: argv.set,
                    bin: argv.bin,
                    index: argv.index
                }

                let type = argv.type.toUpperCase()
                switch (type) {
                    case 'NUMERIC':
                        options['datatype'] = aerospike.indexDataType.NUMERIC
                        break
                    case 'STRING':
                        type = 'STRING'
                        options['datatype'] = aerospike.indexDataType.STRING
                        break
                    case 'GEO2DSPHERE':
                        type = 'GEO2DSPHERE'
                        options['datatype'] = aerospike.indexDataType.GEO2DSPHERE
                        break
                    default:
                        throw new Error(`Unsupported index type: ${argv.type}`)
                }

                await this.client.createIndex(options)
                console.info(`Creating ${type} index "${options.index}" on bin "${options.bin}"`)
                resolve({})
            } catch (error) {
                reject(error)
            }
        })

    }

    async  indexRemove(argv) {
        await this.client.indexRemove(this.namespace, argv.index)
        console.info(`Removing index "${argv.index}"`)
    }

    async put(argv: IAerospike.Put): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                const bins = argv.bins
                const meta = this.buildMeta(argv)
                const policy = this.buildPolicy(argv)
                console.info(key, bins, meta, policy)
                let res = await this.client.put(key, bins, meta, policy)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        })
    }

    async append(argv: IAerospike.Append): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                const bins = argv.bins
                const meta = this.buildMeta(argv)
                const policy = this.buildPolicy(argv)
                console.info(key, bins, meta, policy)
                let res = await this.client.append(key, bins)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        })
    }

    async  get(argv: IAerospike.Get): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                let record
                if (argv.bins) {
                    record = await this.client.select(key, argv.bins)
                } else {
                    record = await this.client.get(key)
                }
                console.info(record)
                resolve((record && record.bins) ? record.bins : record)
            } catch (error) {
                reject(error)
            }
        })
    }

    async  query(argv: IAerospike.Query): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const query = this.client.query(this.namespace, argv.set)
                this.selectBins(query, argv)
                this.applyFilter(query, argv)

                // const udf = this.udfParams(argv)
                let res
                if (argv.udf && argv.background) {
                    res = await this.queryBackground(query, argv.udf)
                } else if (argv.udf) {
                    res = await this.queryApply(query, argv.udf)
                } else {
                    res = await this.queryForeach(query)
                }
                resolve(res)
            } catch (error) {
                reject(error)
            }
        })
    }

    async  listOperations(argv: IAerospike.ListOperation): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                let operations = [
                    lists.append(argv.bin, argv.bins)
                ]
                let res = await this.client.operate(key, operations)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        })
    }
    private printRecord(record) {
        const key = record.key.key || record.key.digest.toString('hex')
    }

    private consume(stream) {
        return new Promise(function (resolve, reject) {
            stream.on('error', reject)
            stream.on('end', resolve)
        })
    }
    private async  queryForeach(query) {
        return new Promise(async (resolve, reject) => {
            try {
                const stream = query.foreach()
                stream.on('data', this.printRecord)
                resolve(await this.consume(stream))
            } catch (error) {
                reject(error)
            }
        })
    }

    private async  queryBackground(query, udf) {
        const job = await query.background(udf.module, udf.func, udf.args)
        console.info('Running query in background - Job ID:', job.jobID)
        return job
    }

    private async  queryApply(query, udf: IAerospike.Udf) {
        const result = await query.apply(udf.module, udf.func, udf.args)
        console.info('Query result:', result)
        return result
    }

    async  udfRegister(argv) {
        return new Promise(async (resolve, reject) => {
            try {
                const module = argv.module
                const job = await this.client.udfRegister(module)
                await job.waitUntilDone()
                console.info('UDF module registered successfully')
                resolve(job)
            } catch (error) {
                reject(error)
            }
        })
    }

    async  udfRemove(argv) {
        return new Promise(async (resolve, reject) => {
            try {
                const module = path.basename(argv.module)
                const job = await this.client.udfRemove(module)
                await job.waitUntilDone()
                console.info('UDF module removed successfully')
                resolve(job)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const Aerospike = new AerospikeClass('americana');