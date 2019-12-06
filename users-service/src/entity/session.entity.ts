'use strict';
import { BaseEntity } from './base.entity'
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class SessionEntity extends BaseEntity {
    protected model = 'session'
    constructor() {
        super('session')
    }

    public sessionSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        language: Joi.string().valid(Constant.DATABASE.LANGUAGE.AR, Constant.DATABASE.LANGUAGE.EN).trim().required(),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        appversion: Joi.string().trim().required(),
        devicemodel: Joi.string().trim().required(),
        devicetype: Joi.string().valid(Constant.DATABASE.TYPE.DEVICE.ANDROID, Constant.DATABASE.TYPE.DEVICE.IOS).trim().required(),
        osversion: Joi.string().trim().required(),
        deviceid: Joi.string().trim().required().description("sk"),
        isLogin: Joi.number().required(),
        createdAt: Joi.number().required(),
    });

    async createSession(userId, payload: IUserRequest.ISession) {
        try {
            let session: IUserRequest.ISession = {
                deviceid: payload.deviceid,
                otp: 0,
                otpExpAt: 0,
                otpVerified: 1,
                language: payload.language,
                country: payload.country,
                appversion: payload.appversion,
                devicemodel: payload.devicemodel,
                devicetype: payload.devicetype,
                osversion: payload.osversion,
                isLogin: 1,
                createdAt: new Date().getTime(),
                cartId: ""
            }
            let updateSession = {
                session: {}
            }
            updateSession['session'][payload.deviceid] = session
            let putArg: IAerospike.Put = {
                bins: updateSession,
                set: 'user',
                key: userId,
                update: true,
            }
            await Aerospike.put(putArg)
        } catch (err) {
            consolelog("createSession", err, false)
            return Promise.reject(err)
        }
    }
}

export const SessionE = new SessionEntity()
