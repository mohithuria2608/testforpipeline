import * as mongoose from "mongoose";
import * as Constant from '../constant'
import * as Services from '../mongo/dao';
import { consolelog } from '../utils'
import { locationService } from '../grpc/client'

export class BaseEntity {
    public ObjectId = mongoose.Types.ObjectId;
    public DAOManager = new Services.DAOManager();
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    async createOneEntityMdb(saveData: Object) {
        try {
            let data = await this.DAOManager.saveData(this.set, saveData)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity createOneEntityMdb', error, false)
            return Promise.reject(error)
        }
    }

    async getOneEntityMdb(criteria: Object, projection: Object, option?) {
        try {
            if (option != undefined) {
                option['lean'] = true
            } else {
                option = { lean: true }
            }
            let data = await this.DAOManager.findOne(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity getOneEntityMdb', error, false)
            return Promise.reject(error)
        }

    }

    async getMultipleMdb(criteria: Object, projection: Object, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.getData(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity getMultipleMdb', error, false)
            return Promise.reject(error)
        }
    }

    async updateOneEntityMdb(criteria: Object, dataToUpdate: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, lean: true }
            let data = await this.DAOManager.findAndUpdate(this.set, criteria, dataToUpdate, option)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity updateOneEntityMdb', error, false)
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
}