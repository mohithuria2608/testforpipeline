import * as Constant from '../constant'
import { consolelog } from '../utils'
import { authService } from '../grpc/client'

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
}