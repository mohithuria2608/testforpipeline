import * as config from "config"
import { menuServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog, sendError } from '../../../utils'

export class MenuService {

    private authProto = __dirname + config.get("directory.static.proto.menu.client");
    private packageDefinition = protoLoader.loadSync(
        this.authProto,
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
        consolelog('Connection established from order service to menu service', config.get("grpc.menu.client"), true)
    }

    async fetchMenu(payload: IMenuServiceRequest.IFetchMenuData): Promise<IMenuServiceRequest.IFetchMenuRes> {
        return new Promise(async (resolve, reject) => {
            await menuServiceValidator.fetchMenu(payload)
            this.menuClient.fetchMenu({ country: payload.country, isDefault: payload.isDefault }, (err, res) => {
                if (!err) {
                    consolelog("successfully fetched Menu", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog("Error in fetching Menu", JSON.stringify(err), false)
                    reject(sendError(err))
                }
            })
        })
    }
}

export const menuService = new MenuService();