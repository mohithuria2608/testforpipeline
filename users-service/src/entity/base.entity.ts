import * as Constant from '../constant/appConstants'
import * as Services from '../databases/dao';
import * as mongoose from "mongoose";
import * as utils from '../utils'

export class BaseEntity {
    public ObjectId = mongoose.Types.ObjectId;
    public DAOManager = new Services.DAOManager();
    protected modelName: ModelNames;
    constructor(modelName?) {
        this.modelName = modelName
    }

    async createOneEntity(saveData: Object) {
        try {
            let data = await this.DAOManager.saveData(this.modelName, saveData)
            return data
        } catch (error) {
            utils.consolelog('Base entity createOneEntity', error, false)
            return Promise.reject(error)
        }
    }

    async createMulti(saveData: any) {
        try {
            let data = await this.DAOManager.insertMany(this.modelName, saveData, {})
            return data
        } catch (error) {
            utils.consolelog('Base entity createMulti', error, false)
            return Promise.reject(error)
        }
    }

    async getOneEntity(criteria: Object, projection: Object, option?) {
        try {
            if (option != undefined) {
                option['lean'] = true
            } else {
                option = { lean: true }
            }
            let data = await this.DAOManager.findOne(this.modelName, criteria, projection, option)
            return data
        } catch (error) {
            utils.consolelog('Base entity getOneEntity', error, false)
            return Promise.reject(error)
        }

    }
    async updateOneEntity(criteria: Object, dataToUpdate: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, lean: true }
            let data = await this.DAOManager.findAndUpdate(this.modelName, criteria, dataToUpdate, option)
            return data
        } catch (error) {
            utils.consolelog('Base entity updateOneEntity', error, false)
            return Promise.reject(error)
        }
    }

    async replaceOneEntity(criteria: Object, replacement: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, upsert: true }
            let data = await this.DAOManager.findAndReplaceOne(this.modelName, criteria, replacement, option)
            return data
        } catch (error) {
            utils.consolelog('Base entity replaceOneEntity', error, false)
            return Promise.reject(error)
        }

    }

    async getById(_id: string, projection: Object) {
        try {
            let data = await this.DAOManager.findOne(this.modelName, { _id: _id }, projection, { lean: true })
            return data
        } catch (error) {
            utils.consolelog('Base entity getById', error, false)
            return Promise.reject(error)
        }
    }

    async getMultiple(criteria: Object, projection: Object) {
        try {
            let data = await this.DAOManager.getData(this.modelName, criteria, projection, { lean: true })
            return data
        } catch (error) {
            utils.consolelog('Base entity getMultiple', error, false)
            return Promise.reject(error)
        }
    }

    async getDistinct(key: string, criteria: Object) {
        try {
            let data = await this.DAOManager.distinct(this.modelName, key, criteria)
            return data
        } catch (error) {
            utils.consolelog('Base entity getDistinct', error, false)
            return Promise.reject(error)
        }
    }

    async updateMultiple(criteria: Object, projection: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, multi: true }
            let data = await this.DAOManager.updateMany(this.modelName, criteria, projection, option)
            return data
        } catch (error) {
            utils.consolelog('Base entity updateMultiple', error, false)
            return Promise.reject(error)
        }
    }

    async aggregate(pipeline, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.aggregateData(this.modelName, pipeline, option)
            return data
        } catch (error) {
            utils.consolelog('Base entity aggregate', error, false)
            return Promise.reject(error)
        }
    }

    async removeEntity(criteria: Object) {
        try {
            let data = await this.DAOManager.remove(this.modelName, criteria)
            return data
        } catch (error) {
            utils.consolelog('Base entity removeEntity', error, false)
            return Promise.reject(error)
        }
    }

    async findAndRemove(criteria: Object) {
        try {
            let data = await this.DAOManager.findAndRemove(this.modelName, criteria, {});
            return data;
        } catch (error) {
            utils.consolelog('Base entity findAndRemove', error, false)
            return Promise.reject(error)
        }
    };

    async count(criteria: Object) {
        try {
            let data = await this.DAOManager.count(this.modelName, criteria)
            return data
        } catch (error) {
            utils.consolelog('Base entity count', error, false)
            return Promise.reject(error)
        }
    }
}