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
        consolelog('Connection established from kafka service to sync service', config.get("grpc.sync.client"), true)
    }

    async syncUser(payload: ISyncGrpcRequest.ICreateUserData): Promise<ISyncGrpcRequest.ICreateUserRes> {
        return new Promise(async (resolve, reject) => {
            try {
                await syncServiceValidator.createUserOnCmsValidator(payload)
                this.syncClient.createUserOnCms(payload, (err, res) => {
                    if (!err) {
                        consolelog("successfully created user on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog("Error in creating user on cms", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const syncService = new SyncService();