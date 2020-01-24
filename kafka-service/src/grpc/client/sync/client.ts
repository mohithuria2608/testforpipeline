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
        consolelog(process.cwd(), 'GRPC connection established sync-service', config.get("grpc.sync.client"), true)
    }

    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await syncServiceValidator.syncValidator(payload)
                this.syncClient.sync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced sync on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing sync on cms", JSON.stringify(error), false)
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