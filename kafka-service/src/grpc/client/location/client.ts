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

    /**
     * @description : this will sync location data from CMS
     * @param payload 
     */
    async syncLocationFromCMS(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await locationServiceValidator.syncValidator(payload)
                this.locationClient.SyncLocationFromCMS(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced location on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing location on cms", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
    * @description : this will post location data to CMS
    * @param payload 
    */
    async postLocationDataToCMS(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await locationServiceValidator.syncValidator(payload)
                this.locationClient.PostLocationDataToCMS(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced location on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing location on cms", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        });
    }

    async sync(payload: IKafkaRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await locationServiceValidator.syncValidator(payload)
                this.locationClient.sync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced location on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing location on cms", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const locationService = new LocationService();