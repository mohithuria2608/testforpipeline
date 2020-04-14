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
import { consolelog } from "../utils";
import { kafkaService } from '../grpc/client'

class AerospikeClass {

    public client: any;
    public namespace: string;
    public cdt = aerospike.cdt;
    public maps = aerospike.maps;
    public operations = aerospike.operations;
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
                        totalTimeout: config.get("aerospike.config.timeout")
                    }
                    let aerospikeConfig = {
                        hosts: config.get("aerospike.hosts"),
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
                        maxConnsPerNode: config.get("aerospike.config.maxConnsPerNode"),
                    }

                    this.client = await aerospike.connect(aerospikeConfig);
                    if (this.client) {
                        global.healthcheck.as = true
                        consolelog(process.cwd(), "Aerospike Client Connected", "", true)
                        this.udfRegister({ module: process.cwd() + '/lua/user.lua' })
                        if (ENTITY.UserE.sindex && ENTITY.UserE.sindex.length > 0)
                            this.bootstrapIndex(ENTITY.UserE.sindex)
                        if (ENTITY.SessionE.sindex && ENTITY.SessionE.sindex.length > 0)
                            this.bootstrapIndex(ENTITY.SessionE.sindex)
                        if (ENTITY.UserchangeE.sindex && ENTITY.UserchangeE.sindex.length > 0)
                            this.bootstrapIndex(ENTITY.UserchangeE.sindex)
                        resolve({})
                    }
                } catch (error) {
                    consolelog(process.cwd(), "ERROR IN AEROSPIKE", JSON.stringify(error), false)
                    reject(error)
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
                consolelog(process.cwd(), "bootstrap index error ", JSON.stringify(error), false)
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
            const point = this.GeoJSON.Point(filter.lng, filter.lat)
            query.where(aerospike.filter.geoWithinGeoJSONRegion(bin, point))
        }
        return query
    }

    async  indexCreate(argv: IAerospike.CreateIndex) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
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
                    consolelog(process.cwd(), `Creating ${type} index "${options.index}" on bin "${options.bin}"`, "", false)
                    resolve({})
                } else reject('Client not initialized');
            } catch (error) {
                if (error.code == Constant.STATUS_MSG.AEROSPIKE_ERROR.TYPE.DUPLICATE_INDEX)
                    resolve({})
                reject(error)
            }
        })

    }

    async  indexRemove(argv) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    await this.client.indexRemove(this.namespace, argv.index)
                    consolelog(process.cwd(), `Removing index "${argv.index}"`, "", false)
                    resolve()
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    async put(argv: IAerospike.Put): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                    const bins = argv.bins
                    const meta = this.buildMeta(argv)
                    const policy = this.buildPolicy(argv)
                    let res = await this.client.put(key, bins, meta, policy)
                    resolve(res)
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    async remove(argv: IAerospike.Remove) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                    await this.client.remove(key)
                    consolelog(process.cwd(), 'Removed record:', JSON.stringify(key), false)
                    resolve()
                } else reject('Client not initialized');
            } catch (error) {
                if (error.code == Constant.STATUS_MSG.AEROSPIKE_ERROR.TYPE.DATA_NOT_FOUND)
                    resolve({})
                reject(error)
            }
        })
    }

    async append(argv: IAerospike.Append): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                    const bins = argv.bins
                    const meta = this.buildMeta(argv)
                    const policy = this.buildPolicy(argv)
                    consolelog(process.cwd(), 'append record:', { key, bins, meta, policy }, false)
                    let res = await this.client.append(key, bins)
                    resolve(res)
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    async  get(argv: IAerospike.Get): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                    let record
                    if (argv.bins) {
                        record = await this.client.select(key, argv.bins)
                    } else {
                        record = await this.client.get(key)
                    }
                    resolve((record && record.bins) ? record.bins : record)
                } else reject('Client not initialized');
            } catch (error) {
                if (error.code == Constant.STATUS_MSG.AEROSPIKE_ERROR.TYPE.DATA_NOT_FOUND)
                    resolve({})
                reject(error)
            }
        })
    }

    async scan(argv: IAerospike.Scan): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    concurrent: (argv.concurrent != undefined) ? argv.nobins : true,
                    nobins: (argv.nobins != undefined) ? argv.nobins : false,
                    select: argv.bins
                }
                if (this.client) {
                    let scan = this.client.scan(this.namespace, argv.set, options, { concurrent: true, nobins: false })
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
                if (this.client) {
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
                } else reject('Client is not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    private async queryForeach(query) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    let stream = query.foreach(),
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
            } catch (error) {
                reject(error);
            }
        })
    }

    private async  queryBackground(query, udf) {
        const job = await query.background(udf.module, udf.func, udf.args)
        consolelog(process.cwd(), 'Running query in background - Job ID:', job.jobID, false)
        return job
    }

    private async  queryApply(query, udf: IAerospike.Udf) {
        if (udf.forEach) {
            await query.setUdf(udf.module, udf.func, udf.args)
            const result = await this.queryForeach(query)
            consolelog(process.cwd(), 'Query result:', JSON.stringify(result), false)
            return result
        } else {
            const result = await query.apply(udf.module, udf.func, udf.args)
            consolelog(process.cwd(), 'Query result:', JSON.stringify(result), false)
            return result
        }
    }

    async exists(argv: IAerospike.Exists) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                    let record = await this.client.exists(key)
                    resolve(record)
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    async  udfRegister(argv) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const module = argv.module
                    const job = await this.client.udfRegister(module)
                    await job.waitUntilDone()
                    consolelog(process.cwd(), 'UDF module registered successfully', "", false)
                    resolve(job)
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    async  udfRemove(argv) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const module = path.basename(argv.module)
                    const job = await this.client.udfRemove(module)
                    await job.waitUntilDone()
                    consolelog(process.cwd(), 'UDF module removed successfully', "", false)
                    resolve(job)
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    async operationsOnMap(argv: IAerospike.MapOperation, operations) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                    let result = await this.client.operate(key, operations)
                    consolelog(process.cwd(), 'Map updated successfully', JSON.stringify(result), false)
                    resolve(result)
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    async getByValue(binName, value, returnType, context?) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    // const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                    let result = await this.maps.getByValue(binName, value, returnType, context)
                    consolelog(process.cwd(), 'Map updated successfully', JSON.stringify(result), false)
                    resolve(result)
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }

    async  listOperations(argv: IAerospike.ListOperation): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    const key = new aerospike.Key(this.namespace, argv.set, argv.key)
                    let operations = []
                    if (argv.order == true)
                        this.lists.order.ORDERED
                    else
                        this.lists.order.UNORDERED
                    if (argv.append)
                        operations.push(this.lists.append(argv.bin, argv.bins))
                    if (argv.appendItems)
                        operations.push(this.lists.appendItems(argv.bin, argv.bins))
                    if (argv.remByIndex) {
                        operations.push(this.lists.removeByIndex(argv.bin, argv.index)
                            .andReturn(this.lists.returnType.VALUE))
                    }
                    if (argv.getByIndexRange) {
                        operations.push(this.lists.getByIndexRange(argv.bin, argv.index)
                            .andReturn(this.lists.returnType.VALUE))
                    }
                    if (argv.remByValue)
                        operations.push(this.lists.removeByValue(argv.bin, argv.value))
                    let res = await this.client.operate(key, operations)
                    resolve(res)
                } else reject('Client not initialized');
            } catch (error) {
                if (error.code == Constant.STATUS_MSG.AEROSPIKE_ERROR.TYPE.DATA_NOT_FOUND)
                    resolve({})
                reject(error)
            }
        })
    }

    async truncate(argv: IAerospike.Truncate) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.client) {
                    await this.client.truncate(this.namespace, argv.set, argv.before_nanos)
                    resolve()
                } else reject('Client not initialized');
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const Aerospike = new AerospikeClass('americana');