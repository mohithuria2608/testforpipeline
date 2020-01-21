import * as config from "config"
import { logServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class LogService {

    private logProto = __dirname + config.get("directory.static.proto.log.client");
    private packageDefinition = protoLoader.loadSync(
        this.logProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadLog = grpc.loadPackageDefinition(this.packageDefinition).LogService
    private logClient = new this.loadLog(config.get("grpc.log.client"), grpc.credentials.createInsecure());

    constructor() {
        consolelog(process.cwd(), 'GRPC connection established log-service', config.get("grpc.log.client"), true)
    }

    /**
     * @description : this will sync log
     * @param payload 
     */
    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await logServiceValidator.syncValidator(payload)
                this.logClient.sync(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully synced log on mongo", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing log on mongo", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const logService = new LogService();