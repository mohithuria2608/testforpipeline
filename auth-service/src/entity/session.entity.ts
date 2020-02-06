'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog, generateSessionId } from '../utils'
import { Aerospike } from '../aerospike'

export class SessionEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []

    constructor() {
        super('session')
    }

    /**
     * @description Get single session
     * @param deviceid 
     * @param userId 
     */
    async getSession(deviceid: string, userId: string) {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: generateSessionId(userId, deviceid)
            }
            let prevSession = await Aerospike.get(getArg)
            if (prevSession && prevSession.id) {
                return prevSession
            } else {
                return {}
            }
        } catch (error) {
            consolelog(process.cwd(), "getSession", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const SessionE = new SessionEntity()
