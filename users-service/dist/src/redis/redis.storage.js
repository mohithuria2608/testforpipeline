"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("ioredis");
const config = require("config");
const util = require("util");
const utils = require("../utils");
class RedisStorage {
    constructor() {
        this.client = new redis({
            port: config.get("redis.port"),
            host: config.get("redis.host"),
            db: config.get("redis.db")
        });
    }
    /////////////////////////////////////////////////////REDIS KEY VALUE///////////////////////////////////////////////////////////////////////////
    /**
    * @description Insert in redis
    */
    insertKeyInRedis(key, value, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (value == null || value == undefined || value == "") {
                    return {};
                }
                else {
                    let promise1 = util.promisify(this.client.set).bind(this.client);
                    let appSocket = yield promise1(key.toString() + prefix, value.toString());
                    utils.consolelog('insertKeyInRedis', [key.toString(), value], true);
                    return {};
                }
            }
            catch (error) {
                utils.consolelog('Redis storage insertKeyInRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
    /**
    * @description Get socket ids from redis db stored corresponding to userId
    */
    getKeyFromRedis(key, prefix, fileName, functionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise1 = util.promisify(this.client.get).bind(this.client);
                let value = yield promise1(key.toString() + prefix);
                // utils.consolelog('getKeyFromRedis', [key.toString() + prefix, value, fileName, functionName], true)
                return value;
            }
            catch (error) {
                utils.consolelog('Redis storage getKeyFromRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
    /**
    * @description Delete socket ids from redis db stored corresponding to userId
    */
    delKeyFromRedis(key, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise1 = util.promisify(this.client.del).bind(this.client);
                yield promise1(key.toString() + prefix);
                utils.consolelog('delKeyFromRedis', key.toString() + prefix, true);
                return;
            }
            catch (error) {
                utils.consolelog('Redis storage delKeyFromRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
    // async delSocketIdFromRedis(key, currentSocketId, prefix: string) {
    //     try {
    //         let socketId = await this.getKeyFromRedis(key, prefix, __filename)
    //         if (socketId == currentSocketId) {
    //             let promise1 = util.promisify(this.client.del).bind(this.client)
    //             await promise1(key.toString() + prefix);
    //             utils.consolelog('delKeyFromRedis', key.toString() + prefix, true)
    //             return
    //         } else {
    //             return
    //         }
    //     } catch (error) {
    //         utils.consolelog('Redis storage delKeyFromRedis', error, false)
    //         return Promise.reject(error)
    //     }
    // }
    /**
    * @description Expire key from redis
    */
    expireKeyFromRedis(key, prefix, expireAt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise1 = util.promisify(this.client.expire).bind(this.client);
                let value = yield promise1(key.toString() + prefix, expireAt);
                utils.consolelog('expireKeyFromRedis', [key.toString() + prefix, value], true);
                return value;
            }
            catch (error) {
                utils.consolelog('Redis storage expireKeyFromRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
    /////////////////////////////////////////////////////REDIS HASH ///////////////////////////////////////////////////////////////////////////
    /**
     * @description To save an object in redis hashmap
     * @param key name of redis hash
     * @param field  name of key in redis hash
     * @param value value to be saved against a field
     */
    insertKeyInRedisHash(key, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hmset = util.promisify(this.client.hmset).bind(this.client);
                yield hmset(key, field.toString(), value);
                return;
            }
            catch (error) {
                utils.consolelog('insertKeyInRedisHash', error, false);
                return Promise.reject(error);
            }
        });
    }
    /**
     * @description to delete a field from a redis hash
     * @param key name of redis hash
     * @param field name of field to be deleted
     */
    deleteKeyFromRedisHash(key, field, socketId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (socketId) {
                    let hexists = util.promisify(this.client.hexists).bind(this.client);
                    let keyExists = yield hexists(key.toString(), field);
                    if (keyExists == 0) {
                        utils.consolelog('deleteKeyFromRedisHash', keyExists, false);
                        return {};
                    }
                }
                let hdel = util.promisify(this.client.hdel).bind(this.client);
                yield hdel(key.toString(), field.toString());
            }
            catch (error) {
                utils.consolelog('deleteKeyFromRedisHash', error, false);
                return Promise.reject(error);
            }
        });
    }
    /**
     * @description To get  a particular value corresponding to a key in redis hash
     * @param key   name of redis hash
     * @param field  name of key stored in a redis hash
     */
    getKeyFromRedisHash(key, field) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hget = util.promisify(this.client.hget).bind(this.client);
                let data = yield hget(key.toString(), field);
                return data;
            }
            catch (error) {
                utils.consolelog('getKeyFromRedisHash', error, false);
                return Promise.reject(error);
            }
        });
    }
    /**
     * @description To fetch data saved in a hashmap
     * @param key
     */
    getAllFromRedisHash(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let hgetall = util.promisify(this.client.hgetall).bind(this.client);
                return yield hgetall(key.toString());
            }
            catch (error) {
                utils.consolelog('getAllFromRedisHash', error, false);
                return Promise.reject(error);
            }
        });
    }
    /////////////////////////////////////////////////////REDIS LIST ///////////////////////////////////////////////////////////////////////////
    rPushInRedis(key, element, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise1 = util.promisify(this.client.rpush).bind(this.client);
                let addRoomToSet = yield promise1(key.toString() + prefix, element);
                utils.consolelog('rPushInRedis', [key.toString() + prefix, element], true);
                return {};
            }
            catch (error) {
                utils.consolelog('Redis storage rPushInRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
    lPushInRedis(key, element, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise1 = util.promisify(this.client.lpush).bind(this.client);
                let addRoomToSet = yield promise1(key.toString() + prefix, element);
                utils.consolelog('lPushInRedis', [key.toString() + prefix, element], true);
                return {};
            }
            catch (error) {
                utils.consolelog('Redis storage lPushInRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
    /**
    * @description Get room ids from redis db stored corresponding to userId_room
    */
    getListInRedis(key, prefix, lRange, uRange) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise1 = util.promisify(this.client.lrange).bind(this.client);
                let listInfo = yield promise1(key.toString() + prefix, lRange, uRange);
                utils.consolelog('getListInRedis', [key.toString() + prefix, JSON.stringify(listInfo)], true);
                return listInfo;
            }
            catch (error) {
                utils.consolelog('Redis storage getListInRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
    deleteListInRedis(key, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise1 = util.promisify(this.client.del).bind(this.client);
                let deleteList = yield promise1(key.toString() + prefix);
                utils.consolelog('deleteListInRedis', [key.toString() + prefix], true);
                return {};
            }
            catch (error) {
                utils.consolelog('Redis storage deleteListInRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
    removeElementFromListInRedis(key, element, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise1 = util.promisify(this.client.lrem).bind(this.client);
                let removeELementFromList = yield promise1(key.toString() + prefix, 0, element.toString()); //@comment : removes all matching element from the array
                utils.consolelog('removeElementFromListInRedis', [key.toString() + prefix, element], true);
                return {};
            }
            catch (error) {
                utils.consolelog('Redis storage removeElementFromListInRedis', error, false);
                return Promise.reject(error);
            }
        });
    }
}
exports.RedisStorage = RedisStorage;
exports.RedisStorageC = new RedisStorage();
