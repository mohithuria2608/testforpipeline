import * as redis from "ioredis";
import * as config from "config";
import * as util from "util";
import * as helper from "../utils"

export class RedisStorage {
    private client = new redis({
        port: config.get("redis.port"), // Redis port
        host: config.get("redis.host"), // Redis host
        db: config.get("redis.db")
    })

    constructor() { }
    /////////////////////////////////////////////////////REDIS KEY VALUE///////////////////////////////////////////////////////////////////////////
    /**
    * @description Insert in redis
    */
    async insertKeyInRedis(key, value, prefix: string) {
        try {
            if (value == null || value == undefined || value == "") {
                return {}
            } else {
                let promise1 = util.promisify(this.client.set).bind(this.client)
                let appSocket = await promise1(key.toString() + prefix, value.toString())
                helper.consolelog('insertKeyInRedis', [key.toString(), value], true)
                return {}
            }

        } catch (error) {
            helper.consolelog('Redis storage insertKeyInRedis', error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @description Get socket ids from redis db stored corresponding to userId
    */
    async getKeyFromRedis(key, prefix, fileName?, functionName?) {
        try {
            let promise1 = util.promisify(this.client.get).bind(this.client)
            let value = await promise1(key.toString() + prefix);
            // helper.consolelog('getKeyFromRedis', [key.toString() + prefix, value, fileName, functionName], true)
            return value
        } catch (error) {
            helper.consolelog('Redis storage getKeyFromRedis', error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @description Delete socket ids from redis db stored corresponding to userId
    */
    async delKeyFromRedis(key, prefix: string) {
        try {
            let promise1 = util.promisify(this.client.del).bind(this.client)
            await promise1(key.toString() + prefix);
            helper.consolelog('delKeyFromRedis', key.toString() + prefix, true)
            return
        } catch (error) {
            helper.consolelog('Redis storage delKeyFromRedis', error, false)
            return Promise.reject(error)
        }
    }

    // async delSocketIdFromRedis(key, currentSocketId, prefix: string) {
    //     try {
    //         let socketId = await this.getKeyFromRedis(key, prefix, __filename)
    //         if (socketId == currentSocketId) {
    //             let promise1 = util.promisify(this.client.del).bind(this.client)
    //             await promise1(key.toString() + prefix);
    //             helper.consolelog('delKeyFromRedis', key.toString() + prefix, true)
    //             return
    //         } else {
    //             return
    //         }
    //     } catch (error) {
    //         helper.consolelog('Redis storage delKeyFromRedis', error, false)
    //         return Promise.reject(error)
    //     }
    // }

    /**
    * @description Expire key from redis 
    */
    async expireKeyFromRedis(key, prefix, expireAt) {
        try {
            let promise1 = util.promisify(this.client.expire).bind(this.client)
            let value = await promise1(key.toString() + prefix, expireAt);
            helper.consolelog('expireKeyFromRedis', [key.toString() + prefix, value], true)
            return value
        } catch (error) {
            helper.consolelog('Redis storage expireKeyFromRedis', error, false)
            return Promise.reject(error)
        }
    }

    /////////////////////////////////////////////////////REDIS HASH ///////////////////////////////////////////////////////////////////////////

    /**
     * @description To save an object in redis hashmap
     * @param key name of redis hash
     * @param field  name of key in redis hash 
     * @param value value to be saved against a field
     */

    async insertKeyInRedisHash(key: string, field: string, value: any) {
        try {
            let hmset = util.promisify(this.client.hmset).bind(this.client)
            await hmset(key, field.toString(), value)
            return
        }
        catch (error) {
            helper.consolelog('insertKeyInRedisHash', error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description to delete a field from a redis hash 
     * @param key name of redis hash
     * @param field name of field to be deleted
     */

    async deleteKeyFromRedisHash(key: string, field: string, socketId?) {
        try {
            if (socketId) {
                let hexists = util.promisify(this.client.hexists).bind(this.client);
                let keyExists = await hexists(key.toString(), field)
                if (keyExists == 0) {
                    helper.consolelog('deleteKeyFromRedisHash', keyExists, false)
                    return {}
                }
            }

            let hdel = util.promisify(this.client.hdel).bind(this.client);
            await hdel(key.toString(), field.toString())
        }
        catch (error) {
            helper.consolelog('deleteKeyFromRedisHash', error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description To get  a particular value corresponding to a key in redis hash 
     * @param key   name of redis hash
     * @param field  name of key stored in a redis hash   
     */

    async getKeyFromRedisHash(key: string, field: string) {
        try {
            let hget = util.promisify(this.client.hget).bind(this.client)
            let data = await hget(key.toString(), field)
            return data
        } catch (error) {
            helper.consolelog('getKeyFromRedisHash', error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description To fetch data saved in a hashmap
     * @param key 
     */

    async getAllFromRedisHash(key: string) {
        try {
            let hgetall = util.promisify(this.client.hgetall).bind(this.client)
            return await hgetall(key.toString())
        } catch (error) {
            helper.consolelog('getAllFromRedisHash', error, false)
            return Promise.reject(error)
        }
    }

    /////////////////////////////////////////////////////REDIS LIST ///////////////////////////////////////////////////////////////////////////

    async rPushInRedis(key: string, element: string, prefix: string) {
        try {
            let promise1 = util.promisify(this.client.rpush).bind(this.client)
            let addRoomToSet = await promise1(key.toString() + prefix, element);
            helper.consolelog('rPushInRedis', [key.toString() + prefix, element], true)
            return {}
        } catch (error) {
            helper.consolelog('Redis storage rPushInRedis', error, false)
            return Promise.reject(error)
        }
    }

    async lPushInRedis(key: string, element: string, prefix: string) {
        try {
            let promise1 = util.promisify(this.client.lpush).bind(this.client)
            let addRoomToSet = await promise1(key.toString() + prefix, element);
            helper.consolelog('lPushInRedis', [key.toString() + prefix, element], true)
            return {}
        } catch (error) {
            helper.consolelog('Redis storage lPushInRedis', error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @description Get room ids from redis db stored corresponding to userId_room
    */
    async getListInRedis(key: string, prefix: string, lRange: number, uRange: number) {
        try {
            let promise1 = util.promisify(this.client.lrange).bind(this.client)
            let listInfo = await promise1(key.toString() + prefix, lRange, uRange);
            helper.consolelog('getListInRedis', [key.toString() + prefix, JSON.stringify(listInfo)], true)
            return listInfo
        } catch (error) {
            helper.consolelog('Redis storage getListInRedis', error, false)
            return Promise.reject(error)
        }
    }

    async deleteListInRedis(key: string, prefix: string) {
        try {
            let promise1 = util.promisify(this.client.del).bind(this.client)
            let deleteList = await promise1(key.toString() + prefix);
            helper.consolelog('deleteListInRedis', [key.toString() + prefix], true)
            return {}
        } catch (error) {
            helper.consolelog('Redis storage deleteListInRedis', error, false)
            return Promise.reject(error)
        }
    }

    async removeElementFromListInRedis(key: string, element: string, prefix: string) {
        try {
            let promise1 = util.promisify(this.client.lrem).bind(this.client)
            let removeELementFromList = await promise1(key.toString() + prefix, 0, element.toString()); //@comment : removes all matching element from the array
            helper.consolelog('removeElementFromListInRedis', [key.toString() + prefix, element], true)
            return {}
        } catch (error) {
            helper.consolelog('Redis storage removeElementFromListInRedis', error, false)
            return Promise.reject(error)
        }
    }

    /////////////////////////////////////////////////////REDIS SETS ///////////////////////////////////////////////////////////////////////////
    /**
    * @description Update room id one at a time from redis db stored corresponding to userId_room
    */
    // async insertSetInRedis(key: string, element: string, prefix: string) {
    //     try {
    //         let promise1 = util.promisify(this.client.sadd).bind(this.client)
    //         let addRoomToSet = await promise1(key.toString() + prefix, element);
    //         helper.consolelog('insertSetInRedis', [key.toString() + prefix, element], true)
    //         return {}
    //     } catch (error) {
    //         helper.consolelog('Redis storage insertSetInRedis', error, false)
    //         return Promise.reject(error)
    //     }
    // }

    // /**
    // * @description Get room ids from redis db stored corresponding to userId_room
    // */
    // async getSetInRedis(key: string, prefix: string) {
    //     try {
    //         let promise1 = util.promisify(this.client.smembers).bind(this.client)
    //         let setInfo = await promise1(key.toString() + prefix);
    //         helper.consolelog('getSetInRedis', [key.toString() + prefix, JSON.stringify(setInfo)], true)
    //         return setInfo
    //     } catch (error) {
    //         helper.consolelog('Redis storage getSetInRedis', error, false)
    //         return Promise.reject(error)
    //     }
    // }

    // async deleteSetInRedis(key: string, prefix: string) {
    //     try {
    //         let promise1 = util.promisify(this.client.del).bind(this.client)
    //         let addRoomToSet = await promise1(key.toString() + prefix);
    //         helper.consolelog('deleteSetInRedis', [key.toString() + prefix], true)
    //         return {}
    //     } catch (error) {
    //         helper.consolelog('Redis storage deleteSetInRedis', error, false)
    //         return Promise.reject(error)
    //     }
    // }


    // /**
    // * @description Remove room id one at a time from redis db stored corresponding to userId_room
    // */
    // async removeElementFromSetInRedis(key: string, element: string, prefix: string) {
    //     try {
    //         let promise1 = util.promisify(this.client.srem).bind(this.client)
    //         let addRoomToSet = await promise1(key.toString() + prefix, element.toString());
    //         helper.consolelog('removeElementFromSetInRedis', [key.toString() + prefix, element], true)
    //         return {}
    //     } catch (error) {
    //         helper.consolelog('Redis storage removeElementFromSetInRedis', error, false)
    //         return Promise.reject(error)
    //     }
    // }

    /**
    * @description Execute multi command in redis 
    */
    // async execMulti(commands: any) {
    //     try {
    //         let promise1 = util.promisify(this.client.multi).bind(this.client)
    //         let execMultiCommands = await promise1.exec(commands);
    //         helper.consolelog('execMulti', commands, true)
    //         return {}

    //     } catch (error) {
    //         helper.consolelog('Redis storage execMulti', error, false)
    //         return Promise.reject(error)
    //     }
    // }

}

export const RedisStorageC = new RedisStorage()
