import * as Constant from '../constant'
import { consolelog } from '../utils'
import { authService, locationService } from '../grpc/client'

export class BaseEntity {
    protected set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async createToken(dataToSend: IAuthGrpcRequest.ICreateTokenData) {
        try {
            return authService.createToken(dataToSend)
        } catch (error) {
            consolelog("createToken", error, false)
            return Promise.reject(error)
        }
    }

    async validateCoordinate(lat: number, lng: number) {
        try {
            return await locationService.validateCoordinate({ lat, lng })
        } catch (error) {
            consolelog("validateCoordinate", error, false)
            return Promise.reject(error)
        }
    }

    // async getAreaByStoreId(storeId: number) {
    //     try {
    //         return await locationService.getAreaByStoreId({ storeId })
    //     } catch (error) {
    //         consolelog("getAreaByStoreId", error, false)
    //         return Promise.reject(error)
    //     }
    // }
}