import * as config from "config"
import { locationServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog } from '../../../utils'

export class LocationService {

    private locationProto = __dirname + config.get("directory.static.proto.location.client");
    private packageDefinition = protoLoader.loadSync(
        this.locationProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadLocation = grpc.loadPackageDefinition(this.packageDefinition).LocationService
    private locationClient = new this.loadLocation(config.get("grpc.location.client"), grpc.credentials.createInsecure());

    constructor() {
        consolelog(process.cwd(), 'GRPC connection established location-service', config.get("grpc.location.client"), true)
    }

    async fetchStore(payload: IStoreGrpcRequest.IFetchStore): Promise<IStoreGrpcRequest.IStore> {
        return new Promise(async (resolve, reject) => {
            try {
                await locationServiceValidator.fetchStoreValidator(payload)
                this.locationClient.fetchStore({ storeId: payload.storeId }, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully fetched store", JSON.stringify(res), false)
                        resolve(res.store)
                    } else {
                        consolelog(process.cwd(), "Error in  fetching store", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    async validateCoordinate(payload: IStoreGrpcRequest.IValidateCoordinateData): Promise<IStoreGrpcRequest.IStore[]> {
        return new Promise(async (resolve, reject) => {
            try {
                await locationServiceValidator.validateCoordinateValidator(payload)
                this.locationClient.validateCoordinate({ lat: parseFloat(payload.lat.toString()), lng: parseFloat(payload.lng.toString()) }, (err, res) => {
                    if (!err) {
                        consolelog(process.cwd(), "successfully verified coordinates", JSON.stringify(res), false)
                        resolve(res.store)
                    } else {
                        consolelog(process.cwd(), "Error in verifying coordinates", JSON.stringify(err), false)
                        reject(err)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const locationService = new LocationService();