import * as mongoose from "mongoose";
import * as Services from '../mongo/dao';
import { consolelog } from '../utils';

export class BaseEntity {
    public DAOManager = new Services.DAOManager();
    public set: SetNames;
    constructor(set) {
        this.set = set
    }

    async createOneEntity(saveData: Object) {
        try {
            let data = await this.DAOManager.saveData(this.set, saveData)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity createOneEntity', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async createMulti(saveData: any) {
        try {
            let data = await this.DAOManager.insertMany(this.set, saveData, {})
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity createMulti', JSON.stringify(error), false)
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
            let data = await this.DAOManager.findOne(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity getOneEntity', JSON.stringify(error), false)
            return Promise.reject(error)
        }

    }
    async updateOneEntity(criteria: Object, dataToUpdate: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, lean: true }
            let data = await this.DAOManager.findAndUpdate(this.set, criteria, dataToUpdate, option)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity updateOneEntity', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async replaceOneEntity(criteria: Object, replacement: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, upsert: true }
            let data = await this.DAOManager.findAndReplaceOne(this.set, criteria, replacement, option)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity replaceOneEntity', JSON.stringify(error), false)
            return Promise.reject(error)
        }

    }

    async getById(_id: string, projection: Object) {
        try {
            let data = await this.DAOManager.findOne(this.set, { _id: _id }, projection, { lean: true })
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity getById', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async getMultiple(criteria: Object, projection: Object, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.getData(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity getMultiple', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async getDistinct(key: string, criteria: Object) {
        try {
            let data = await this.DAOManager.distinct(this.set, key, criteria)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity getDistinct', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateMultiple(criteria: Object, projection: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, multi: true }
            let data = await this.DAOManager.updateMany(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity updateMultiple', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async aggregate(pipeline, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.aggregateData(this.set, pipeline, option)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity aggregate', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async removeEntity(criteria: Object) {
        try {
            let data = await this.DAOManager.remove(this.set, criteria)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity removeEntity', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async findAndRemove(criteria: Object) {
        try {
            let data = await this.DAOManager.findAndRemove(this.set, criteria, {});
            return data;
        } catch (error) {
            consolelog(process.cwd(),'Base entity findAndRemove', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    };

    async count(criteria: Object) {
        try {
            let data = await this.DAOManager.count(this.set, criteria)
            return data
        } catch (error) {
            consolelog(process.cwd(),'Base entity count', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}