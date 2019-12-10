import * as config from "config"
import { outletServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class OutletService {

    private outletProto = __dirname + config.get("directory.static.proto.outlet.client");
    private packageDefinition = protoLoader.loadSync(
        this.outletProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadOutlet = grpc.loadPackageDefinition(this.packageDefinition).OutletService
    private outletClient = new this.loadOutlet(config.get("grpc.outlet.client"), grpc.credentials.createInsecure());

    constructor() {
        consolelog('Connection established from user service to outlet service', config.get("grpc.outlet.client"), true)
    }

    async validateCoordinate(payload: IOutletServiceRequest.IValidateCoordinateData): Promise<IOutletServiceRequest.IOutlet> {
        return new Promise(async (resolve, reject) => {
            try {
                await outletServiceValidator.validateCoordinateValidator(payload)
                this.outletClient.validateCoordinate({ lat: payload.lat, lng: payload.lng }, (err, res) => {
                    if (!err) {
                        consolelog("successfully verified coordinates", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog("Error in verifying coordinates", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const outletService = new OutletService();