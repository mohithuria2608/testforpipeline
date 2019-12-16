import * as Constant from '../constant'
import { consolelog } from '../utils'
import { authService, locationService, kafkaService } from '../grpc/client'

export class BaseEntity {
    protected set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async createToken(dataToSend: IAuthGrpcRequest.ICreateTokenData) {
        try {
            return authService.createToken(dataToSend)
        } catch (error) {
            consolelog(process.cwd(),"createToken", error, false)
            return Promise.reject(error)
        }
    }

    async validateCoordinate(lat: number, lng: number): Promise<IStoreGrpcRequest.IStore[]> {
        try {
            return await locationService.validateCoordinate({ lat, lng })
        } catch (error) {
            consolelog(process.cwd(),"validateCoordinate", error, false)
            return Promise.reject(error)
        }
    }

    async syncUser(user: IUserRequest.IUserData) {
        try {
            let data: IKafkaGrpcRequest.ISyncUserData = {
                aerospikeId: user.id,
                lastname: user.cCode + user.phnNo,
                firstname: user.name,
                email: user.email,
                storeId: 1,
                websiteId: 1,
                password: user.password,
            }
            kafkaService.syncUser(data)
            return {}
        } catch (error) {
            consolelog(process.cwd(),"syncUser", error, false)
            return Promise.reject(error)
        }
    }
}