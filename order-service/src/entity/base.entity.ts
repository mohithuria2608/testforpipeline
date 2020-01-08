import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { locationService } from '../grpc/client'

export class BaseEntity {
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async validateCoordinate(lat: number, lng: number): Promise<IStoreGrpcRequest.IStore[]> {
        try {
            return await locationService.validateCoordinate({ lat, lng })
        } catch (error) {
            consolelog(process.cwd(), "validateCoordinate", error, false)
            return Promise.reject(error)
        }
    }
}