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

        // brand: Joi.string().valid(Constant.DATABASE.BRAND.KFC, Constant.DATABASE.BRAND.PH),
        // acount_uae: {
        //     cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
        //     phnNo: Joi.string().trim().required().description("sk"),
        //     sdmUserRef: Joi.number().required().description("sk"),
        //     cmsUserRef: Joi.number().required().description("sk"),
        //     phnVerified: Joi.number().valid(0, 1).required(),
        // },
        // acount_ksa: {
        //     cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
        //     phnNo: Joi.string().trim().required().description("sk"),
        //     sdmUserRef: Joi.number().required().description("sk"),
        //     cmsUserRef: Joi.number().required().description("sk"),
        //     phnVerified: Joi.number().valid(0, 1).required(),
        // },


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
        password: Joi.string(),
        cartId: Joi.string().required(),
        createdAt: Joi.number().required(),
        changePhnNo: Joi.number().valid(0, 1).required(),
    });

    /**
    * @method INTERNAL/GRPC
    * @param {string} userId : user id
    * */
    async getUser(payload: IUserRequest.IFetchUser) {
        try {
            if (payload.userId) {
                let getArg: IAerospike.Get = {
                    set: this.set,
                    key: payload.userId
                }
                let user: IUserRequest.IUserData = await Aerospike.get(getArg)
                if (user && user.id) {
                    return user
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.USER_NOT_FOUND)
            } else {
                let queryArg: IAerospike.Query = {
                    udf: {
                        module: 'user',
                        func: Constant.UDF.USER.check_phone_exist,
                        args: [payload.cCode],
                        forEach: true
                    },
                    equal: {
                        bin: "phnNo",
                        value: payload.phnNo
                    },
                    set: this.set,
                    background: false,
                }
                let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                if (checkUser && checkUser.length > 0) {
                    return checkUser[0]
                } else {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.USER_NOT_FOUND)
                }
            }
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
            name: "",
            cCode: "",
            phnNo: "",
            phnVerified: 0,
            email: "",
            profileStep: 0,
            socialKey: "",
            medium: "",
            createdAt: 0,
            cartId: this.ObjectId().toString(),
            password: 'Password1', //await cryptData(id),
            changePhnNo: 0,
        } : {}
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
                ttl: Constant.SERVER.INITIAL_USER_TTL,
                create: true,
            }
            await Aerospike.put(putArg)
            this.createDefaultCart(dataToSave.cartId, dataToSave.id)
            let user = await this.getUser({ userId: dataToSave.id })
            return user
        } catch (error) {
            consolelog(process.cwd(), "createUser", error, false)
            return Promise.reject(error)
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
            if (payload.changePhnNo != undefined)
                userUpdate['changePhnNo'] = payload.changePhnNo
            if (payload.socialKey)
                userUpdate['socialKey'] = payload.socialKey
            if (payload.socialKey)
                userUpdate['medium'] = payload.medium
            if (payload.phnNo)
                userUpdate['phnNo'] = payload.phnNo
            if (payload.cCode)
                userUpdate['cCode'] = payload.cCode
            if (payload.phnVerified != undefined)
                userUpdate['phnVerified'] = payload.phnVerified
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
    async getTokens(deviceid: string, devicetype: string, tokentype: string[], id: string, isGuest: number, sessionTime: number) {
        try {
            if (tokentype && tokentype.length > 0) {
                let promise = []
                tokentype.map(elem => {
                    let dataToSend = {
                        deviceid: deviceid,
                        devicetype: devicetype,
                        tokenType: elem,
                        isGuest: parseInt(isGuest.toString()),
                        sessionTime: sessionTime
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
