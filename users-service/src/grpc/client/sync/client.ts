import * as config from "config"
import { syncServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class SyncService {

    private syncProto = __dirname + config.get("directory.static.proto.sync.client");
    private packageDefinition = protoLoader.loadSync(
        this.syncProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadSync = grpc.loadPackageDefinition(this.packageDefinition).SyncService
    private syncClient = new this.loadSync(config.get("grpc.sync.client"), grpc.credentials.createInsecure());

    constructor() {
        console.log(process.cwd(), 'GRPC connection established sync-service', config.get("grpc.sync.client"), true)
    }

    async fetchConfig(payload: ISyncGrpcRequest.IFetchConfig): Promise<ISyncGrpcRequest.IConfig> {
        return new Promise(async (resolve, reject) => {
            try {
                await syncServiceValidator.fetchConfigValidator(payload)
                this.syncClient.fetchConfig({ store_code: payload.store_code }, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully fetched store", JSON.stringify(res), false)
                        resolve(res.config)
                    } else {
                        consolelog(process.cwd(), "Error in fetched store", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const syncService = new SyncService();