'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog, cryptData } from '../utils'
import * as CMS from "../cms";
import * as SDM from '../sdm';
import { Aerospike } from '../aerospike'


export class UserEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
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
            bin: 'cmsUserRef',
            index: 'idx_' + this.set + '_' + 'cmsUserRef',
            type: "NUMERIC"
        },
        {
            set: this.set,
            bin: 'sdmUserRef',
            index: 'idx_' + this.set + '_' + 'sdmUserRef',
            type: "NUMERIC"
        }
    ]

    constructor() {
        super('user')
    }

    public sessionSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        brand: Joi.string().valid(Constant.DATABASE.BRAND.KFC, Constant.DATABASE.BRAND.PH),
        language: Joi.string().valid(Constant.DATABASE.LANGUAGE.AR, Constant.DATABASE.LANGUAGE.EN).trim().required(),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        appversion: Joi.string().trim().required(),
        devicemodel: Joi.string().trim().required(),
        devicetype: Joi.string().valid(Constant.DATABASE.TYPE.DEVICE.ANDROID, Constant.DATABASE.TYPE.DEVICE.IOS).trim().required(),
        osversion: Joi.string().trim().required(),
        deviceid: Joi.string().trim().required(),
        isLogin: Joi.number().required(),
        isGuest: Joi.number().valid(0, 1).required(),
        createdAt: Joi.number().required(),
        updatedAt: Joi.number().required(),
    });

    public userSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        sdmUserRef: Joi.number().required().description("sk"),
        cmsUserRef: Joi.number().required().description("sk"),
        isGuest: Joi.number().valid(0, 1).required(),
        cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
        phnNo: Joi.string().trim().required().description("sk"),
        phnVerified: Joi.number().valid(0, 1).required(),
        email: Joi.string().email().lowercase().trim().required().description("sk"),
        profileStep: Joi.number().valid(
            Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
            Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
        ).required(),
        socialKey: Joi.string().trim().required().description("sk"),
        medium: Joi.string().trim().valid(
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.FB,
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.GOOGLE,
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.APPLE
        ).required(),
        mergeUserId: Joi.string(),
        password: Joi.string(),
        session: Joi.any(),
        cartId: Joi.string().required(),
        createdAt: Joi.number().required(),
    });

    /**
    * @method INTERNAL/GRPC
    * @param {string} userId : user id
    * */
    async getUser(payload: IUserRequest.IFetchUser) {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: payload.userId
            }
            let user: IUserRequest.IUserData = await Aerospike.get(getArg)
            if (user && user.id) {
                return user
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.USER_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getUser", error, false)
            return Promise.reject(error)
        }
    }

    private async buildUser(headers: ICommonRequest.IHeaders, userInfo: IUserRequest.IUserUpdate, isCreate: boolean) {
        const id = this.uuidv1();
        const user = isCreate ? {
            id: id,
            sdmUserRef: 0,
            cmsUserRef: 0,
            isGuest: 0,
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
            mergeUserId: "",
            cartId: await cryptData(headers.deviceid),
            password: 'Password1'//await cryptData(id)
        } : {}
        if (userInfo.isGuest != undefined) {
            if (userInfo.isGuest == 1)
                user['isGuest'] = userInfo.isGuest
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
        if (userInfo.mergeUserId != undefined)
            user['mergeUserId'] = userInfo.mergeUserId
        return user
    }

    /**
     * @todo : add updated time in session token
     */
    public async buildSession(headers: ICommonRequest.IHeaders, sessionInfo: IUserRequest.ISessionUpdate, isCreate: boolean) {
        let session = isCreate ? {
            otp: 0,
            otpExpAt: 0,
            otpVerified: 0,
            isLogin: 0,
            isGuest: 0,
            deviceid: headers.deviceid,
            language: headers.language,
            country: headers.country,
            appversion: headers.appversion,
            devicemodel: headers.devicemodel,
            devicetype: headers.devicetype,
            osversion: headers.osversion,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        } : {}
        if (sessionInfo.isGuest != undefined) {
            if (sessionInfo.isGuest == 1)
                session['isGuest'] = sessionInfo.isGuest
        }
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
                ...await this.buildUser(headers, userInfo, true)
            }
            dataToSave['session'][headers.deviceid] = { ...await this.buildSession(headers, sessionCreate, true) }
            let putArg: IAerospike.Put = {
                bins: dataToSave,
                set: this.set,
                key: dataToSave.id,
                ttl: userInfo.isGuest ? Constant.SERVER.INITIAL_GUEST_USER_TTL : Constant.SERVER.INITIAL_USER_TTL,
                create: true,
            }
            await Aerospike.put(putArg)
            this.createDefaultCart(dataToSave.cartId, dataToSave.id)
            let user = await this.getUser({ userId: dataToSave.id })
            return user
        } catch (err) {
            consolelog(process.cwd(), "createUser", err, false)
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
                ...await this.buildUser(headers, userUpdate, false),
                session: {}
            }
            if (userData.session && userData.session.hasOwnProperty(headers.deviceid) && userData.session[headers.deviceid]) {
                const Context = Aerospike.cdt.Context
                const context = new Context().addMapKey(headers.deviceid)
                let op = [
                    Aerospike.maps.putItems('session', { ...await this.buildSession(headers, sessionUpdate, false) }, {
                        writeFlags: Aerospike.maps.writeFlags.UPDATE_ONLY | Aerospike.maps.writeFlags.NO_FAIL | Aerospike.maps.writeFlags.PARTIAL
                    }).withContext(context)
                ]
                await Aerospike.operationsOnMap({ set: this.set, key: userData.id }, op)
                delete dataToUpdate['session']
            } else {
                dataToUpdate['session'][headers.deviceid] = { ...await this.buildSession(headers, sessionUpdate, true) }
            }

            let putArg: IAerospike.Put = {
                bins: dataToUpdate,
                set: this.set,
                key: userData.id,
                update: true,
            }
            await Aerospike.put(putArg)
            let user = await this.getUser({ userId: userData.id })
            return user
        } catch (err) {
            consolelog(process.cwd(), "createSession", err, false)
            return Promise.reject(err)
        }
    }

    async removeSession(headers: ICommonRequest.IHeaders, userData: IUserRequest.IUserData) {
        try {
            if (userData.session && userData.session.hasOwnProperty(headers.deviceid)) {
                let dataToUpdate = { session: {} }
                dataToUpdate.session[headers.deviceid] = null
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: this.set,
                    key: userData.id,
                    update: true,
                }
                await Aerospike.put(putArg)
                return {}
            } else
                return {}
        } catch (err) {
            consolelog(process.cwd(), "removeSession", err, false)
            return Promise.reject(err)
        }
    }

    async updateUser(userData: IUserRequest.IUserData, payload: IUserRequest.IEditProfile, ) {
        try {
            let userUpdate = {}
            if (payload.email)
                userUpdate['email'] = payload.email
            if (payload.name)
                userUpdate['name'] = payload.name
            let putArg: IAerospike.Put = {
                bins: userUpdate,
                set: this.set,
                key: userData.id,
                update: true,
            }
            await Aerospike.put(putArg)
            let user = await this.getUser({ userId: userData.id })
            return user
        } catch (error) {
            consolelog(process.cwd(), "updateUser", error, false)
            return Promise.reject(error)
        }
    }

    async getTokens(deviceid: string, devicetype: string, tokentype: string[], id: string, isGuest: number) {
        try {
            if (tokentype && tokentype.length > 0) {
                let promise = []
                tokentype.map(elem => {
                    let dataToSend = {
                        deviceid: deviceid,
                        devicetype: devicetype,
                        tokenType: elem,
                        isGuest: isGuest
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
        } catch (error) {
            consolelog(process.cwd(), "getTokens", error, false)
            return Promise.reject(error)
        }
    }

    async syncFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            if (payload.cms.create || payload.cms.update)
                this.createUserOnCms(payload)
            if (payload.sdm.create || payload.sdm.update)
                this.createUserOnSdm(payload)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    async createUserOnSdm(payload) {
        try {
            const payloadForSdm = {
            }
            let res = await SDM.UserSDME.createCustomer(payloadForSdm)
            let putArg: IAerospike.Put = {
                bins: { sdmUserRef: parseInt(res.id.toString()) },
                set: this.set,
                key: "1",// payload.aerospikeId,
                update: true,
            }
            // await Aerospike.put(putArg)
            return res
        } catch (error) {
            consolelog(process.cwd(), "createUserOnSdm", error, false)
            return Promise.reject(error)
        }
    }

    async createUserOnCms(payload) {
        try {
            const payloadForCms = {
                customer: {
                    firstname: payload.firstname,
                    lastname: payload.lastname,
                    email: payload.email,
                    store_id: payload.storeId,
                    website_id: payload.websiteId,
                    addresses: []
                },
                password: payload.password
            }
            let res = await CMS.UserCMSE.createCostomer({}, payloadForCms)

            consolelog(process.cwd(), "resresresresresres", res, false)

            let putArg: IAerospike.Put = {
                bins: { cmsUserRef: parseInt(res.id.toString()) },
                set: this.set,
                key: payload.aerospikeId,
                update: true,
            }
            // await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createUserOnCms", error, false)
            return Promise.reject(error)
        }
    }

    async checkUserOnCms(payload: IUserRequest.ICheckUserOnCms): Promise<any> {
        try {
            return {}
        } catch (error) {
            consolelog(process.cwd(), "checkUserOnCms", error, false)
            return Promise.reject(error)
        }
    }

    async checkUserOnSdm(payload: IUserRequest.ICheckUserOnSdm): Promise<any> {
        try {
            return {}
        } catch (error) {
            consolelog(process.cwd(), "checkUserOnSdm", error, false)
            return Promise.reject(error)
        }
    }


}

export const UserE = new UserEntity()
