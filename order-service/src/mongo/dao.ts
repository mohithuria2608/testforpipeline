'use strict';
import * as Models from '../models';
import * as mongoose from "mongoose";
import { consolelog } from '../utils'

export class DAOManager {
    public ObjectId = mongoose.Types.ObjectId;
    constructor() {

    }
    async saveData(model: SetNames, data: any) {
        try {
            let ModelName = Models[model]
            data.createdDate = new Date().getTime()
            return await new ModelName(data).save();
        }
        catch (error) {
            return Promise.reject(error)
        }
    };


    async insertMany(model: SetNames, data, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.insertMany(data, options);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async getData(model: SetNames, query: any, projection: any, options: any) {
        try {
            let ModelName = Models[model]
            return await ModelName.find(query, projection, options);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async distinct(model: SetNames, path: string, query: any) {
        try {
            let ModelName = Models[model]
            return await ModelName.distinct(path, query);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async findOne(model: SetNames, query, projection, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.findOne(query, projection, options).exec();
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async findAll(model: SetNames, query, projection, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.find(query, projection, options).exec();
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async findAndUpdate(model: SetNames, conditions, update, options) {
        try {
            let ModelName = Models[model]
            if (options != undefined) {
                options['writeConcern'] = { w: "majority", wtimeout: 5000 }
            } else {
                options = { writeConcern: { w: "majority", wtimeout: 5000 } }
            }
            return await ModelName.findOneAndUpdate(conditions, update, options);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async findAndRemove(model: SetNames, conditions, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.findOneAndRemove(conditions, options);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async updateMany(model: SetNames, conditions, update, options) {
        try {
            let ModelName = Models[model]
            if (options != undefined) {
                options['writeConcern'] = { w: "majority", wtimeout: 5000 }
            } else {
                options = { writeConcern: { w: "majority", wtimeout: 5000 } }
            }
            return await ModelName.updateMany(conditions, update, options);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async findAndReplaceOne(model: SetNames, conditions, replacement, options) {
        try {
            let ModelName = Models[model]
            return await ModelName.replaceOne(conditions, replacement, options);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async remove(model: SetNames, condition) {
        try {
            let ModelName = Models[model]
            return await ModelName.remove(condition);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async populateData(model: SetNames, query, projection, options, collectionOptions) {
        try {
            let ModelName = Models[model];
            return await ModelName.find(query, projection, options).populate(collectionOptions).exec();
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async count(model: SetNames, condition) {
        try {
            let ModelName = Models[model]
            return await ModelName.count(condition);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async aggregateData(model: SetNames, aggregateArray, options) {
        try {
            // utils.consolelog('aggregateArray', JSON.stringify(aggregateArray), false)
            let ModelName = Models[model]
            consolelog(process.cwd(), 'aggregate pipeline', JSON.stringify(aggregateArray), false)
            let aggregation = ModelName.aggregate(aggregateArray);
            if (options) { aggregation.options = options; }
            return await aggregation.exec();
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async aggregateDataWithPopulate(model: SetNames, group, populateOptions) {
        try {
            let ModelName = Models[model]
            let aggregate = await ModelName.aggregate(group);
            let populate = await ModelName.populate(aggregate, populateOptions)
            return populate
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async populateDataOnAggregate(model: SetNames, aggregate, populateOptions) {
        try {
            let ModelName = Models[model]
            return await ModelName.populate(aggregate, populateOptions)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async bulkFindAndUpdate(bulk, query, update, options) {
        try {
            return await bulk.find(query).upsert().update(update, options);
        } catch (error) {
            return Promise.reject(error)
        }
    };

    async bulkFindAndUpdateOne(bulk, query, update, options) {
        try {
            return await bulk.find(query).upsert().updateOne(update, options);
        } catch (error) {
            return Promise.reject(error)
        }
    };
};