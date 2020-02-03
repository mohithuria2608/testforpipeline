import * as config from "config"
import { userServiceValidator } from './client.validator'
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
import { consolelog, sendError } from '../../../utils'

export class UserService {

    private authProto = __dirname + config.get("directory.static.proto.user.client");
    private packageDefinition = protoLoader.loadSync(
        this.authProto,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    private loadUser = grpc.loadPackageDefinition(this.packageDefinition).UserService
    private userClient = new this.loadUser(config.get("grpc.user.client"), grpc.credentials.createInsecure());

    constructor() {
        console.log(process.cwd(), 'GRPC connection established user-service', config.get("grpc.user.client"), true)
    }

    async fetchUser(payload: IUserRequest.IFetchUser): Promise<IUserRequest.IUserData> {
        return new Promise(async (resolve, reject) => {
            await userServiceValidator.fetchUserValidator(payload)
            this.userClient.fetchUser({ userId: payload.userId }, (error, res) => {
                if (!error) {
                    consolelog(process.cwd(), "successfully fetched user by id", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog(process.cwd(), "Error in fetching user by id", JSON.stringify(error), false)
                    reject(sendError(error))
                }
            })
        })
    }

    async fetchAddress(payload: IUserGrpcRequest.IFetchAddress): Promise<IUserGrpcRequest.IFetchAddressRes> {
        return new Promise(async (resolve, reject) => {
            consolelog(process.cwd(), "fetchAddress", payload, false)

            await userServiceValidator.fetchAddressValidator(payload)
            this.userClient.fetchAddress({ userId: payload.userId, addressId: payload.addressId, bin: payload.bin }, (error, res) => {
                if (!error) {
                    consolelog(process.cwd(), "successfully fetched Address by id", JSON.stringify(res), false)
                    resolve(res)
                } else {
                    consolelog(process.cwd(), "Error in fetching Address by id", JSON.stringify(error), false)
                    reject(sendError(error))
                }
            })
        })
    }

    async sync(payload: IKafkaGrpcRequest.IKafkaBody): Promise<{}> {
        return new Promise(async (resolve, reject) => {
            try {
                await userServiceValidator.syncValidator(payload)
                this.userClient.sync(payload, (error, res) => {
                    if (!error) {
                        consolelog(process.cwd(), "successfully synced user on cms", JSON.stringify(res), false)
                        resolve(res)
                    } else {
                        consolelog(process.cwd(), "Error in syncing user on cms", JSON.stringify(error), false)
                        reject(error)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

export const userService = new UserService();