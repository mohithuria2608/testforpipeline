/**
 * @file aerospike.database
 * @description defines aerospike connection and operations
 * @created 2019-11-04 16:58:03
*/

import * as config from "config"
import * as Constant from '../constant'
const aerospike = require('aerospike');
const path = require('path');
import * as ENTITY from '../entity'

class AerospikeClass {

    public client: any;
    public namespace: string;
    public cdt = aerospike.cdt;
    public maps = aerospike.maps;
    public lists = aerospike.lists;
    public GeoJSON = aerospike.GeoJSON;
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
                        //@todo : check for pem file for auth
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
                        console.log("Aerospike Client Connected");
                        if (ENTITY.CountryE.sindex && ENTITY.CountryE.sindex.length > 0)
                            this.bootstrapIndex(ENTITY.CountryE.sindex)
                        if (ENTITY.CityE.sindex && ENTITY.CityE.sindex.length > 0)
                            this.bootstrapIndex(ENTITY.CityE.sindex)
                        if (ENTITY.AreaE.sindex && ENTITY.AreaE.sindex.length > 0)
                            this.bootstrapIndex(ENTITY.AreaE.sindex)
                        if (ENTITY.StoreE.sindex && ENTITY.StoreE.sindex.length > 0)
                            this.bootstrapIndex(ENTITY.StoreE.sindex)
                    }
                } catch (err) {
                    console.log("ERROR IN AEROSPIKE -> ", err);
                    reject(err)
                }
            } else reject(Error('Client already initialized'))
        })
    }

    async bootstrapIndex(sindex: IAerospike.CreateIndex[]) {
        const self = this
        return new Promise((resolve, reject) => {
            try {
                if (this.client) {
                    sindex.forEach(ind => {
                        self.indexCreate(ind)
                    })
                    resolve({})
                }
                else reject('Client not initialized');
            } catch (error) {
                console.log("bootstrap index error ", error);
                reject(error)
            }
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
        } else if (argv.geoWithin) {
            const filter = argv.geoWithin
            const bin = filter.bin
            const point = this.GeoJSON.Point(filter.lat, filter.lng)
            query.where(aerospike.filter.geoWithinGeoJSONRegion(bin, point))
        }
        return query
    }

    async  indexCreate(argv: IAerospike.CreateIndex) {
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
                if (error.code == Constant.STATUS_MSG.AEROSPIKE_ERROR.TYPE.DUPLICATE_INDEX)
                    resolve({})
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
                let res = await this.client.put(key, bins, meta, policy)
                console.log(res)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        })
    }

    async remove(argv: IAerospike.Remove) {
        try {
            const key = new aerospike.Key(this.namespace, argv.set, argv.key)
            await this.client.remove(key)
            console.info('Removed record:', key)
            return {}
        } catch (error) {
            return Promise.reject(error)
        }
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
                if (error.code == Constant.STATUS_MSG.AEROSPIKE_ERROR.TYPE.DATA_NOT_FOUND)
                    resolve({})
                reject(error)
            }
        })
    }

    async scan(set: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    let scan = this.client.scan(this.namespace, set, { concurrent: true, nobins: false })
                    resolve(await this.queryForeach(scan))
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        });
    }

    async  query(argv: IAerospike.Query): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const query = this.client.query(this.namespace, argv.set)
                this.selectBins(query, argv)
                this.applyFilter(query, argv)

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
                    this.lists.append(argv.bin, argv.bins)
                ]
                let res = await this.client.operate(key, operations)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        })
    }

    private async queryForeach(query) {
        return new Promise(async (resolve, reject) => {
            try {
                let stream = query.foreach(),
                    tempData: any = [];
                stream.on('data', function (record) { tempData.push(record); });
                stream.on('error', function (error) { reject(error); });
                stream.on('end', function () {
                    let records: any = [];
                    for (let item of tempData) {
                        records.push(item.bins);
                    }
                    console.log("records", records)
                    resolve(records);
                });
            } catch (error) {
                reject(error);
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

    // private async  applyMapOp(ops: IAerospike.ApplyMapOp[]) {
    //     const Context = aerospike.cdt.Context
    //     let operations = []
    //     ops.forEach(obj => {
    //         let context
    //         if (obj.func == 'putItems') {
    //             let policy = {
    //                 writeFlags: this.maps.writeFlags.UPDATE_ONLY | this.maps.writeFlags.NO_FAIL | this.maps.writeFlags.PARTIAL
    //             }
    //             if (obj.context) {
    //                 context = new Context().addMapKey(obj.context)
    //                 operations.push(this.maps.putItems(obj.key, obj.bins, policy).withContext(context))
    //             } else
    //                 operations.push(this.maps.putItems(obj.key, obj.bins), policy)
    //         }
    //     })
    //     return operations
    // }

    async operationsOnMap(argv: IAerospike.MapOperation, operations) {
        return new Promise(async (resolve, reject) => {
            try {
                const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                let result = await this.client.operate(key, operations)
                console.info('Map updated successfully', result)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const Aerospike = new AerospikeClass('americana');