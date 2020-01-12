import * as Constant from '../constant';
import { consolelog } from '../utils';
import { authService, locationService, orderService, kafkaService } from '../grpc/client';
import * as CMS from "../cms";
import * as SDM from '../sdm';
import { Aerospike } from '../databases/aerospike'

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async createToken(dataToSend: IAuthGrpcRequest.ICreateTokenData) {
        try {
            return authService.createToken(dataToSend)
        } catch (error) {
            consolelog(process.cwd(), "createToken", error, false)
            return Promise.reject(error)
        }
    }

    async validateCoordinate(lat: number, lng: number): Promise<IStoreGrpcRequest.IStore[]> {
        try {
            return await locationService.validateCoordinate({ lat, lng })
        } catch (error) {
            consolelog(process.cwd(), "validateCoordinate", error, false)
            return Promise.reject(error)
        }
    }

    async createDefaultCart(cartId: string, userId: string) {
        try {
            return await orderService.createDefaultCart({ cartId, userId })
        } catch (error) {
            consolelog(process.cwd(), "createDefaultCart", error, false)
            return Promise.reject(error)
        }
    }

    async updateCartTTL(cartId: string, userId: string) {
        try {
            return await orderService.updateCartTTL({ cartId })
        } catch (error) {
            consolelog(process.cwd(), "updateCartTTL", error, false)
            return Promise.reject(error)
        }
    }

    async syncToKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            kafkaService.kafkaSync(payload)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncToKafka", error, false)
            return Promise.reject(error)
        }
    }

    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            this.createUserOnSdm(payload)
            this.createUserOnCms(payload)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    async createUserOnSdm(payload) {
        try {
            const payloadForSdm = {
            }
            let res = await SDM.UserSDME.createCustomer(payloadForSdm)
            let putArg: IAerospike.Put = {
                bins: { sdmUserRef: parseInt(res.id.toString()) },
                set: this.set,
                key: "1",// payload.aerospikeId,
                update: true,
            }
            await Aerospike.put(putArg)
            return res
        } catch (error) {
            consolelog(process.cwd(), "createUserOnSdm", error, false)
            return Promise.reject(error)
        }
    }

    async createUserOnCms(payload) {
        try {
            const payloadForCms = {
                customer: {
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    email: payload.email,
                    store_id: payload.storeId,
                    website_id: payload.websiteId,
                    addresses: []
                },
                password: payload.password
            }
            let res = await CMS.UserCMSE.createCostomer({}, payloadForCms)

            consolelog(process.cwd(), "resresresresresres", res, false)

            let putArg: IAerospike.Put = {
                bins: { cmsUserRef: parseInt(res.id.toString()) },
                set: this.set,
                key: payload.aerospikeId,
                update: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createUserOnCms", error, false)
            return Promise.reject(error)
        }
    }
}