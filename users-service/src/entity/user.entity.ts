'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class UserEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    protected set: SetNames;
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'phnNo',
            index: 'idx_' + this.set + '_' + 'phnNo',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'email',
            index: 'idx_' + this.set + '_' + 'email',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'socialKey',
            index: 'idx_' + this.set + '_' + 'socialKey',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'sessionId',
            index: 'idx_' + this.set + '_' + 'sessionId',
            type: "STRING"
        }
    ]

    constructor() {
        super('user')
    }

    public sessionSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        language: Joi.string().valid(Constant.DATABASE.LANGUAGE.AR, Constant.DATABASE.LANGUAGE.EN).trim().required(),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        appversion: Joi.string().trim().required(),
        devicemodel: Joi.string().trim().required(),
        devicetype: Joi.string().valid(Constant.DATABASE.TYPE.DEVICE.ANDROID, Constant.DATABASE.TYPE.DEVICE.IOS).trim().required(),
        osversion: Joi.string().trim().required(),
        deviceid: Joi.string().trim().required(),
        isLogin: Joi.number().required(),
        createdAt: Joi.number().required(),
    });

    public userSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        isGuest: Joi.number().valid(0, 1),
        sessionId: Joi.string().trim().required().description("sk"),
        cCode: Joi.string().trim().required(),
        phnNo: Joi.string().trim().required().description("sk"),
        phnVerified: Joi.number().valid(0, 1).required(),
        email: Joi.string().email().lowercase().trim().required().description("sk"),
        profileStep: Joi.number().valid(Constant.DATABASE.TYPE.PROFILE_STEP.INIT, Constant.DATABASE.TYPE.PROFILE_STEP.FIRST).required(),
        socialKey: Joi.string().trim().required().description("sk"),
        medium: Joi.string().trim().required(),
        removeUserId: Joi.string(),
        session: Joi.any(),
        createdAt: Joi.number().required(),
    });

    /**
    * @method GRPC
    * @param {string} id : user id
    * */
    async getById(payload: IUserGrpcRequest.IId) {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: payload.id
            }
            let user: IUserRequest.IUserData = await Aerospike.get(getArg)
            if (user && user.id) {
                return user
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E404.USER_NOT_FOUND)
        } catch (error) {
            consolelog("getById", error, false)
            return Promise.reject(error)
        }
    }

    private buildUser(headers: ICommonRequest.IHeaders, userInfo: IUserRequest.IUserUpdate, isCreate: boolean) {
        const id = this.uuidv1();
        const user = isCreate ? {
            id: id,
            isGuest: 0,
            sessionId: "",
            name: "",
            cCode: "",
            phnNo: "",
            phnVerified: 0,
            email: "",
            emailVerified: 0,
            profileStep: 0,
            socialKey: "",
            medium: "",
            createdAt: 0,
            session: {},
            removeUserId: ""
        } : {}
        if (userInfo.isGuest != undefined) {
            if (userInfo.isGuest == 1) {
                user['isGuest'] = userInfo.isGuest
                user['sessionId'] = headers.deviceid
            }
        }
        if (userInfo.name != undefined)
            user['name'] = userInfo.name
        if (userInfo.cCode != undefined)
            user['cCode'] = userInfo.cCode
        if (userInfo.phnNo != undefined)
            user['phnNo'] = userInfo.phnNo
        if (userInfo.phnVerified != undefined)
            user['phnVerified'] = userInfo.phnVerified
        if (userInfo.email != undefined)
            user['email'] = userInfo.email
        if (userInfo.emailVerified != undefined)
            user['emailVerified'] = userInfo.emailVerified
        if (userInfo.profileStep != undefined)
            user['profileStep'] = userInfo.profileStep
        if (userInfo.socialKey != undefined)
            user['socialKey'] = userInfo.socialKey
        if (userInfo.medium != undefined)
            user['medium'] = userInfo.medium
        if (userInfo.createdAt != undefined)
            user['createdAt'] = userInfo.createdAt
        else
            user['createdAt'] = new Date().getTime()
        if (userInfo.removeUserId != undefined)
            user['removeUserId'] = userInfo.removeUserId
        return user
    }

    public buildSession(headers: ICommonRequest.IHeaders, sessionInfo: IUserRequest.ISessionUpdate, isCreate: boolean) {
        let session = isCreate ? {
            otp: 0,
            otpExpAt: 0,
            otpVerified: 0,
            isLogin: 0,
            deviceid: headers.deviceid,
            language: headers.language,
            country: headers.country,
            appversion: headers.appversion,
            devicemodel: headers.devicemodel,
            devicetype: headers.devicetype,
            osversion: headers.osversion,
            createdAt: new Date().getTime(),
            cartId: ""
        } : {}
        if (sessionInfo.otp != undefined)
            session['otp'] = sessionInfo.otp
        if (sessionInfo.otpExpAt != undefined)
            session['otpExpAt'] = sessionInfo.otpExpAt
        if (sessionInfo.otpVerified != undefined)
            session['otpVerified'] = sessionInfo.otpVerified
        if (sessionInfo.isLogin != undefined)
            session['isLogin'] = sessionInfo.isLogin
        if (sessionInfo.createdAt != undefined)
            session['createdAt'] = sessionInfo.createdAt

        if (headers.deviceid != undefined)
            session['deviceid'] = headers.deviceid
        if (headers.language != undefined)
            session['language'] = headers.language
        if (headers.country != undefined)
            session['country'] = headers.country
        if (headers.appversion != undefined)
            session['appversion'] = headers.appversion
        if (headers.devicemodel != undefined)
            session['devicemodel'] = headers.devicemodel
        if (headers.devicetype != undefined)
            session['devicetype'] = headers.devicetype
        if (headers.osversion != undefined)
            session['osversion'] = headers.osversion
        return session
    }

    async createUser(
        headers: ICommonRequest.IHeaders,
        userInfo: IUserRequest.IUserUpdate,
        sessionCreate: IUserRequest.ISessionUpdate,
    ): Promise<IUserRequest.IUserData> {
        try {
            let dataToSave = {
                ...this.buildUser(headers, userInfo, true)
            }
            dataToSave['session'][headers.deviceid] = { ...this.buildSession(headers, sessionCreate, true) }
            let putArg: IAerospike.Put = {
                bins: dataToSave,
                set: this.set,
                key: dataToSave.id,
                ttl: userInfo.isGuest ? Constant.SERVER.INITIAL_GUEST_USER_TTL : Constant.SERVER.INITIAL_USER_TTL,
                create: true,
            }
            await Aerospike.put(putArg)
            let user = await this.getById({ id: dataToSave.id })
            return user
        } catch (err) {
            consolelog("createUser", err, false)
            return Promise.reject(err)
        }
    }

    async createSession(
        headers: ICommonRequest.IHeaders,
        userData: IUserRequest.IUserData,
        userUpdate: IUserRequest.IUserUpdate,
        sessionUpdate: IUserRequest.ISessionUpdate,
    ): Promise<IUserRequest.IUserData> {
        try {
            let dataToUpdate = {
                ...this.buildUser(headers, userUpdate, false),
                session: {}
            }
            if (userData.session && userData.session.hasOwnProperty(headers.deviceid)) {
                const Context = Aerospike.cdt.Context
                const context = new Context().addMapKey(headers.deviceid)
                let op = [
                    Aerospike.maps.putItems('session', { ...this.buildSession(headers, sessionUpdate, false) }, {
                        writeFlags: Aerospike.maps.writeFlags.UPDATE_ONLY | Aerospike.maps.writeFlags.NO_FAIL | Aerospike.maps.writeFlags.PARTIAL
                    }).withContext(context)
                ]
                await Aerospike.operationsOnMap({ set: this.set, key: userData.id }, op)
                delete dataToUpdate['session']
            } else {
                dataToUpdate['session'][headers.deviceid] = { ...this.buildSession(headers, sessionUpdate, true) }
            }

            let putArg: IAerospike.Put = {
                bins: dataToUpdate,
                set: this.set,
                key: userData.id,
                update: true,
            }
            await Aerospike.put(putArg)
            let user = await this.getById({ id: userData.id })
            return user
        } catch (err) {
            consolelog("createSession", err, false)
            return Promise.reject(err)
        }
    }

    async getTokens(deviceid: string, devicetype: string, tokentype: string[], id: string) {
        try {
            if (tokentype && tokentype.length > 0) {
                let promise = []
                tokentype.map(elem => {
                    let dataToSend = {
                        deviceid: deviceid,
                        devicetype: devicetype,
                        tokenType: elem
                    }
                    if (id)
                        dataToSend['id'] = id
                    return promise.push(this.createToken(dataToSend))
                })
                let tokens: IAuthGrpcRequest.IToken[] = await Promise.all(promise)

                let res = {
                    accessToken: undefined,
                    refreshToken: undefined
                }
                tokentype.map((elem, i) => {
                    if (elem == Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH || elem == Constant.DATABASE.TYPE.TOKEN.USER_AUTH) {
                        res['accessToken'] = tokens[i].token
                    } else if (elem == Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH) {
                        res['refreshToken'] = tokens[i].token
                    }
                    return
                })
                return res
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.INVALID_TOKEN_TYPE)
            }
        } catch (err) {
            consolelog("getTokens", err, false)
            return Promise.reject(err)
        }
    }
}

export const UserE = new UserEntity()
