import * as config from "config"
import { menuServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class MenuService {

    private menuProto = __dirname + config.get("directory.static.proto.menu.client");
    private packageDefinition = protoLoader.loadSync(
        this.menuProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadMenu = grpc.loadPackageDefinition(this.packageDefinition).MenuService
    private menuClient = new this.loadMenu(config.get("grpc.menu.client"), grpc.credentials.createInsecure());

    constructor() {
        consolelog(process.cwd(), 'GRPC connection established menu-service', config.get("grpc.menu.client"), true)
    }

    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await menuServiceValidator.syncValidator(payload)
                this.menuClient.sync(payload, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully synced menu on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing menu on cms", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const menuService = new MenuService();