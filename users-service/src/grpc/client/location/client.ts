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
        consolelog('Connection established from user service to location service', config.get("grpc.location.client"), true)
    }

    async validateCoordinate(payload: IStoreGrpcRequest.IValidateCoordinateData): Promise<IStoreGrpcRequest.IStore[]> {
        return new Promise(async (resolve, reject) => {
            try {
                await locationServiceValidator.validateCoordinateValidator(payload)
                console.log(parseFloat(payload.lat.toString()),parseFloat(payload.lng.toString()))
                this.locationClient.validateCoordinate({ lat: parseFloat(payload.lat.toString()), lng: parseFloat(payload.lng.toString()) }, (err, res) => {
                    if (!err) {
                        consolelog("successfully verified coordinates", JSON.stringify(res), false)
                        resolve(res.store)
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

    // async getAreaByStoreId(payload: IAreaGrpcRequest.IGetAreaByStoreIdData): Promise<IAreaGrpcRequest.IArea> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             await locationServiceValidator.getAreaByStoreIdValidator(payload)
    //             this.locationClient.getAreaByStoreId({ storeId: payload.storeId }, (err, res) => {
    //                 if (!err) {
    //                     consolelog("area by store id ", JSON.stringify(res), false)
    //                     resolve(res)
    //                 } else {
    //                     consolelog("Error in getAreaByStoreId", JSON.stringify(err), false)
    //                     reject(err)
    //                 }
    //             })
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }
}

export const locationService = new LocationService();