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

    constructor() { }

    /**
     * @description : this will sync log
     * @param payload 
     */
    async sync(payload: IKafkaGrpcRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await logServiceValidator.syncValidator(payload)
                this.logClient.sync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced log on mongo", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing log on mongo", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const logService = new LogService();