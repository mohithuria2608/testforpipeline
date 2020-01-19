'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import * as CMS from "../cms";
import * as SDM from '../sdm';
import { Aerospike } from '../aerospike'


export class UserEntity extends BaseEntity {
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
        },
        {
            set: this.set,
            bin: 'keepUserId',
            index: 'idx_' + this.set + '_' + 'keepUserId',
            type: "STRING"
        }
    ]

    constructor() {
        super('user')
    }

    public userSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        sdmUserRef: Joi.number().required().description("sk"),
        cmsUserRef: Joi.number().required().description("sk"),
        isGuest: Joi.number().valid(0, 1).required(),
        cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
        phnNo: Joi.string().trim().required().description("sk"),
        changePhnNo: Joi.object().keys({
            cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
            phnNo: Joi.string().trim().required().description("sk"),
        }),
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
        keepUserId: Joi.string().description("sk"),
        password: Joi.string(),
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

    /**
     * @description Build user object
     * @param {ICommonRequest.IHeaders} headers 
     * @param {IUserRequest.IUserUpdate} userInfo 
     * @param {boolean} isCreate 
     */
    private async buildUser(headers: ICommonRequest.IHeaders, userInfo: IUserRequest.IUserUpdate, isCreate: boolean) {
        const user = isCreate ? {
            id: this.ObjectId().toString(),
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
            keepUserId: "",
            cartId: this.ObjectId().toString(),
            password: 'Password1' //await cryptData(id)
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
        if (userInfo.keepUserId != undefined)
            user['keepUserId'] = userInfo.keepUserId
        return user
    }



    /**
     * @description Create user in aerospike
     * @param {ICommonRequest.IHeaders} headers 
     * @param {IUserRequest.IUserUpdate} userInfo 
     */
    async createUser(headers: ICommonRequest.IHeaders, userInfo: IUserRequest.IUserUpdate): Promise<IUserRequest.IUserData> {
        try {
            let dataToSave = {
                ...await this.buildUser(headers, userInfo, true)
            }
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

    /**
     * @description Update user on aerospike
     * @param {IUserRequest.IUserData} userData 
     * @param {IUserRequest.IEditProfile} payload 
     */
    async updateUser(userId: string, payload: IUserRequest.IUserUpdate) {
        try {
            let userUpdate = {}
            if (payload.email)
                userUpdate['email'] = payload.email
            if (payload.name)
                userUpdate['name'] = payload.name
            if (payload.cartId)
                userUpdate['cartId'] = payload.cartId
            if (payload.profileStep)
                userUpdate['profileStep'] = payload.profileStep
            if (payload.isGuest != undefined && payload.isGuest == 1)
                userUpdate['isGuest'] = 1
            if (payload.cCode && payload.phnNo) {
                if (payload.isGuest == 1) {
                    userUpdate['cCode'] = payload.cCode
                    userUpdate['phnNo'] = payload.phnNo
                    userUpdate['phnVerified'] = payload.phnVerified
                } else {

                }
            }
            if (payload.phnVerified)
                userUpdate['phnVerified'] = payload.phnVerified
            if (payload.keepUserId)
                userUpdate['keepUserId'] = payload.keepUserId
            if (payload.socialKey)
                userUpdate['socialKey'] = payload.socialKey
            if (payload.socialKey)
                userUpdate['medium'] = payload.medium
            let putArg: IAerospike.Put = {
                bins: userUpdate,
                set: this.set,
                key: userId,
                update: true,
            }
            await Aerospike.put(putArg)
            let user = await this.getUser({ userId: userId })
            return user
        } catch (error) {
            consolelog(process.cwd(), "updateUser", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Get access and refresh token from auth service 
     * @param {string} deviceid 
     * @param {string} devicetype 
     * @param {string[]} tokentype 
     * @param {string} id 
     * @param {number} isGuest 
     */
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

    /**
     * @description Create user on SDM
     * @param payload 
     */
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

    /**
     * @description Create user on CMS
     * @param payload 
     */
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

    /**
     * @description Get user info from CMS
     * @param payload 
     */
    async checkUserOnCms(payload: IUserRequest.ICheckUserOnCms): Promise<any> {
        try {
            return {}
        } catch (error) {
            consolelog(process.cwd(), "checkUserOnCms", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Get user info from SDM
     * @param payload 
     */
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
