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
    }

    async fetchConfig(payload: ISyncGrpcRequest.IFetchConfig): Promise<ISyncGrpcRequest.IConfig[]> {
        return new Promise(async (resolve, reject) => {
            try {
                await syncServiceValidator.fetchConfigValidator(payload)
                this.syncClient.fetchConfig(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully fetched config", JSON.stringify(res), false)
                        resolve(JSON.parse(res.config))
                    } else {
                        consolelog(process.cwd(), "Error in fetched config", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
    async fetchAppversion(payload: ISyncGrpcRequest.IFetchAppversion): Promise<ISyncGrpcRequest.IAppversion[]> {
        return new Promise(async (resolve, reject) => {
            try {
                await syncServiceValidator.fetchAppversionValidator(payload)
                let req = {
                    isActive: payload.isActive
                }
                if (payload.deviceType)
                    req['deviceType'] = payload.deviceType
                if (payload.type)
                    req['type'] = payload.type
                this.syncClient.fetchAppversion(req, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully fetched app version", JSON.stringify(res), false)
                        resolve(JSON.parse(res.appversion))
                    } else {
                        consolelog(process.cwd(), "Error in fetching  app version", JSON.stringify(error), false)
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