import * as config from "config"
import { uploadServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class UploadService {

    private uploadProto = __dirname + config.get("directory.static.proto.upload.client");
    private packageDefinition = protoLoader.loadSync(
        this.uploadProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadUpload = grpc.loadPackageDefinition(this.packageDefinition).UploadService
    private uploadClient = new this.loadUpload(config.get("grpc.upload.client"), grpc.credentials.createInsecure());

    constructor() {
        console.log(process.cwd(), 'GRPC connection established upload-service', config.get("grpc.upload.client"), true)
    }

    async kafkaSync(payload): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await uploadServiceValidator.uploadValidator(payload)
                this.uploadClient.UploadJSON(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully produced data on kafka for syncing", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in producing data on kafka  for syncing", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const uploadService = new UploadService();