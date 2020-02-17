'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog, generateSessionId } from '../utils'
import * as CMS from "../cms";
import * as SDM from '../sdm';
import { Aerospike } from '../aerospike'

export class SessionEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'userId',
            index: 'idx_' + this.set + '_' + 'userId',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'deviceid',
            index: 'idx_' + this.set + '_' + 'deviceid',
            type: "STRING"
        }
    ]

    constructor() {
        super('session')
    }

    public sessionSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        userId: Joi.string().trim().required().description("sk"),
        deviceid: Joi.string().trim().required().description("sk"),
        language: Joi.string().valid(Constant.DATABASE.LANGUAGE.AR, Constant.DATABASE.LANGUAGE.EN).trim().required(),
        appversion: Joi.string().trim().required(),
        devicemodel: Joi.string().trim().required(),
        devicetype: Joi.string().valid(Constant.DATABASE.TYPE.DEVICE.ANDROID, Constant.DATABASE.TYPE.DEVICE.IOS).trim().required(),
        osversion: Joi.string().trim().required(),
        isGuest: Joi.number().valid(0, 1).required(),
        createdAt: Joi.number().required(),
        sessionTime: Joi.number().required().description("timestamp in seconds")
    });

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

    /**
     * @description Create session
     * @param {ICommonRequest.IHeaders} headers 
     * @param {ISessionRequest.ISession} payload 
     * @param {IUserRequest.IUserUpdate} userData 
     */
    public async buildSession(headers: ICommonRequest.IHeaders, payload: ISessionRequest.ISession) {
        try {
            let sessionTime = Math.ceil((new Date().getTime()) / 1000)
            let isCreate = false
            let session: ISessionRequest.ISession = {
                userId: payload.userId,
                deviceid: headers.deviceid,
                language: headers.language,
                appversion: headers.appversion,
                devicemodel: headers.devicemodel,
                devicetype: headers.devicetype,
                osversion: headers.osversion,
                isGuest: payload.isGuest,
                createdAt: new Date().getTime(),
                sessionTime: sessionTime,
            }
            let checkSession = await this.getSession(headers.deviceid, payload.userId)
            consolelog(process.cwd(), "session", JSON.stringify(session), false)
            if (checkSession && checkSession.id) {
                session['id'] = checkSession.id
            } else {
                isCreate = true
                session['id'] = generateSessionId(payload.userId, headers.deviceid)
            }

            let putArg: IAerospike.Put = {
                bins: session,
                set: this.set,
                key: session.id,
                // ttl: payload.ttl,
            }
            if (isCreate) {
                putArg['create'] = true
                await this.removeAllSessionRelatedToDeviceId(headers.deviceid)
            } else
                putArg['update'] = true

            await Aerospike.put(putArg)
            return session
        } catch (error) {
            consolelog(process.cwd(), "buildSession", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Remove session from aerospike
     * @param {ICommonRequest.IHeaders} headers 
     * @param {IUserRequest.IUserData} userData 
     */
    async removeSession(headers: ICommonRequest.IHeaders, userId: string) {
        try {
            let putArg: IAerospike.Remove = {
                key: generateSessionId(userId, headers.deviceid),
                set: this.set
            }
            await Aerospike.remove(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "removeSession", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Remove session from aerospike on the basis of deviceid
     * @param {string} deviceid
     */
    async removeAllSessionRelatedToDeviceId(deviceid: string) {
        try {
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "deviceid",
                    value: deviceid
                },
                set: this.set,
                background: false,
            }
            let sessions: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (sessions && sessions.length > 0) {
                sessions.map(async obj => {
                    let putArg: IAerospike.Remove = {
                        key: obj.id,
                        set: this.set
                    }
                    await Aerospike.remove(putArg)
                })
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "removeAllSession", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Remove session from aerospike on the basis of userId
     * @param {string} userId
     */
    async removeAllSessionRelatedToUserId(userId: string) {
        try {
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "userId",
                    value: userId
                },
                set: this.set,
                background: false,
            }
            let sessions: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (sessions && sessions.length > 0) {
                sessions.map(async obj => {
                    let putArg: IAerospike.Remove = {
                        key: obj.id,
                        set: this.set
                    }
                    await Aerospike.remove(putArg)
                })
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "removeAllSession", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

}

export const SessionE = new SessionEntity()
