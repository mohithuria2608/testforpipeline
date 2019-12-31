import * as Constant from '../constant'
import { consolelog } from '../utils'
import { authService, locationService, kafkaService } from '../grpc/client'

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

    async syncUser(user: IUserRequest.IUserData, change: ICommonRequest.IChange) {
        try {
            // this.syncToSdmUser(user, change)
            this.syncToCmsUser(user, change)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncUser", error, false)
            return Promise.reject(error)
        }
    }

    private async syncToSdmUser(user: IUserRequest.IUserData, change: ICommonRequest.IChange) {
        try {
            let sdmdata: IKafkaGrpcRequest.ISyncToSDMUserData = {
                action: change,
                aerospikeId: user.id,
                lastname: user.cCode + user.phnNo,
                firstname: user.name,
                email: user.email,
                storeId: 1,
                websiteId: 1,
                password: user.password
            }
            kafkaService.syncToSdmUser(sdmdata)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncToSdmUser", error, false)
            return Promise.reject(error)
        }
    }

    private async syncToCmsUser(user: IUserRequest.IUserData, userChange: ICommonRequest.IChange) {
        try {
            let cmsdata: IKafkaGrpcRequest.ISyncToCMSUserData = {
                action: userChange,
                aerospikeId: user.id,
                lastname: user.cCode + user.phnNo,
                firstname: user.name,
                email: user.email,
                storeId: 1,
                websiteId: 1,
                password: user.password
            }
            kafkaService.syncToCmsUser(cmsdata)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncToCmsUser", error, false)
            return Promise.reject(error)
        }
    }
}