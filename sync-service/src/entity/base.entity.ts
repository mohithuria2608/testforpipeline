import * as mongoose from "mongoose";
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { authService } from '../grpc/client'

export class BaseEntity {
    public ObjectId = mongoose.Types.ObjectId;
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async createToken(dataToSend: IAuthGrpcRequest.ICreateTokenData) {
        try {
            return authService.createToken(dataToSend)
        } catch (error) {
            consolelog(process.cwd(), "createToken", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}