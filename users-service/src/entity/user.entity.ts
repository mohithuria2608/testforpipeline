'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog, cryptData } from '../utils'
import * as CMS from "../cms";
import * as SDM from '../sdm';
import { Aerospike } from '../aerospike'
import { kafkaService } from '../grpc/client';


export class UserEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'username',
            index: 'idx_' + this.set + '_' + 'username',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'fullPhnNo',
            index: 'idx_' + this.set + '_' + 'fullPhnNo',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'cartId',
            index: 'idx_' + this.set + '_' + 'cartId',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'email',
            index: 'idx_' + this.set + '_' + 'email',
            type: "STRING"
        }
    ]
    constructor() {
        super(Constant.SET_NAME.USER)
    }

    public userSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        username: Joi.string().trim().required().description("sk - unique"),
        brand: Joi.string().valid(Constant.DATABASE.BRAND.KFC, Constant.DATABASE.BRAND.PH),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        email: Joi.string().email().lowercase().trim().required(),
        emailVerified: Joi.number().valid(0, 1).required(),
        fullPhnNo: Joi.string().trim().required().description("sk"),
        cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
        phnNo: Joi.string().trim().required(),
        sdmUserRef: Joi.number().required(),
        sdmCorpRef: Joi.number().required(),
        cmsUserRef: Joi.number().required(),
        phnVerified: Joi.number().valid(0, 1).required(),
        name: Joi.string().trim().required(),
        profileStep: Joi.number().valid(
            Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
            Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
        ).required(),
        socialKey: Joi.string().trim().required(),
        medium: Joi.string().trim().valid(
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.FB,
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.GOOGLE,
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.APPLE
        ).required(),
        password: Joi.string(),
        cartId: Joi.string().required(),
        createdAt: Joi.number().required()
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
                    return {}
            } else if (payload.cCode || payload.phnNo) {
                const fullPhnNo = payload.cCode + payload.phnNo;
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "fullPhnNo",
                        value: fullPhnNo
                    },
                    set: this.set,
                    background: false,
                }
                let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                if (checkUser && checkUser.length > 0) {
                    return checkUser[0]
                } else {
                    return {}
                }
            } else if (payload.cartId) {
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "cartId",
                        value: payload.cartId
                    },
                    set: this.set,
                    background: false,
                }
                let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                if (checkUser && checkUser.length > 0) {
                    return checkUser[0]
                } else {
                    return {}
                }
            }
            else {
                return {}
            }
        } catch (error) {
            consolelog(process.cwd(), "getUser", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Update user on aerospike
     * @param {IUserRequest.IUserData} userData 
     * @param {IUserRequest.IEditProfile} payload 
     */
    async buildUser(payload: IUserRequest.IUserData) {
        try {
            if (payload.sdmUserRef && payload.sdmUserRef != 0 && (payload.sdmCorpRef == 0 || payload.sdmCorpRef == null))
                kafkaService.kafkaSync({
                    set: Constant.SET_NAME.LOGGER,
                    mdb: {
                        create: true,
                        argv: JSON.stringify({
                            type: "ISSUE",
                            info: {
                                request: {
                                    body: payload
                                },
                                response: {}
                            },
                            description: "SDM CORP FAILURE",
                            options: {
                                env: Constant.SERVER.ENV[config.get("env")],
                            },
                            createdAt: new Date().getTime(),
                        })
                    },
                    inQ: true
                })
            let isCreate = false
            let userUpdate: IUserRequest.IUserData = {}
            userUpdate['id'] = payload.id
            if (payload.username)
                userUpdate['username'] = payload.username
            if (payload.brand)
                userUpdate['brand'] = payload.brand
            if (payload.country)
                userUpdate['country'] = payload.country
            if (payload.email && payload.email != "")
                userUpdate['email'] = payload.email
            if (payload.fullPhnNo)
                userUpdate['fullPhnNo'] = payload.fullPhnNo
            if (payload.cCode)
                userUpdate['cCode'] = payload.cCode
            if (payload.phnNo)
                userUpdate['phnNo'] = payload.phnNo
            if (payload.sdmUserRef != undefined)
                userUpdate['sdmUserRef'] = parseInt(payload.sdmUserRef.toString())
            if (payload.sdmCorpRef != undefined)
                userUpdate['sdmCorpRef'] = parseInt(payload.sdmCorpRef.toString())
            if (payload.cmsUserRef != undefined)
                userUpdate['cmsUserRef'] = parseInt(payload.cmsUserRef.toString())
            if (payload.phnVerified != undefined)
                userUpdate['phnVerified'] = payload.phnVerified
            if (payload.emailVerified != undefined)
                userUpdate['emailVerified'] = payload.emailVerified
            if (payload.name && payload.name != "")
                userUpdate['name'] = payload.name
            if (payload.socialKey)
                userUpdate['socialKey'] = payload.socialKey
            if (payload.socialKey)
                userUpdate['medium'] = payload.medium
            if (payload.profileStep != undefined)
                userUpdate['profileStep'] = payload.profileStep
            if (payload.cartId)
                userUpdate['cartId'] = payload.cartId
            if (payload.createdAt)
                userUpdate['createdAt'] = payload.createdAt

            if (payload.cmsAddress && payload.cmsAddress.length > 0)
                userUpdate['cmsAddress'] = payload.cmsAddress
            if (payload.asAddress && payload.asAddress.length > 0)
                userUpdate['asAddress'] = payload.asAddress
            if (payload.sdmAddress && payload.sdmAddress.length > 0)
                userUpdate['sdmAddress'] = payload.sdmAddress

            let checkUser = await this.getUser({ userId: payload.id })
            if (checkUser && checkUser.id) {
                isCreate = false
            } else {
                userUpdate['password'] = cryptData("Password1")
                isCreate = true
                userUpdate.cartId = userUpdate.id
                this.createDefaultCart(userUpdate.id)
            }
            let putArg: IAerospike.Put = {
                bins: userUpdate,
                set: this.set,
                key: payload.id,
                // createOrReplace: true
            }
            if (isCreate)
                putArg['create'] = true
            else
                putArg['update'] = true
            await Aerospike.put(putArg)
            let user = await this.getUser({ userId: payload.id })
            return user
        } catch (error) {
            consolelog(process.cwd(), "updateUser", JSON.stringify(error), false)
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
            consolelog(process.cwd(), "getTokens", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Create user on SDM
     * @param payload 
     */
    async createUserOnSdm(payload: IUserRequest.IUserData) {
        try {
            let res = await SDM.UserSDME.createCustomerOnSdm(payload)

            let putArg: IAerospike.Put = {
                bins: {
                    sdmUserRef: parseInt(res.CUST_ID.toString()),
                    sdmCorpRef: parseInt(res.CUST_CORPID.toString()),
                },
                set: this.set,
                key: payload.id,
                update: true,
            }
            await Aerospike.put(putArg)
            let user = await this.getUser({ userId: payload.id })
            if (user.socialKey) {
                SDM.UserSDME.updateCustomerTokenOnSdm(user)
            }
            console.log("user after getting sdm id", user)
            if (user.cmsUserRef != 0) {
                kafkaService.kafkaSync({
                    set: this.set,
                    cms: {
                        update: true,
                        argv: JSON.stringify(user)
                    },
                    inQ: true
                })
            }

            return user
        } catch (error) {
            consolelog(process.cwd(), "createUserOnSdm", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Update user on SDM
     * @param payload 
     */
    async updateUserOnSdm(payload: IUserRequest.IUserData) {
        try {
            let res = await SDM.UserSDME.updateCustomerOnSdm(payload)
            return res
        } catch (error) {
            consolelog(process.cwd(), "updateUserOnSdm", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Create user on CMS
     * @param payload 
     */
    async createUserOnCms(payload: IUserRequest.IUserData) {
        try {
            let res = await CMS.UserCMSE.createCustomerOnCms(payload)
            if (res && res.customerId) {
                let putArg: IAerospike.Put = {
                    bins: {
                        cmsUserRef: parseInt(res.customerId.toString()),
                    },
                    set: this.set,
                    key: payload.id,
                    update: true,
                }
                await Aerospike.put(putArg)
                let user = await this.getUser({ userId: payload.id })
                console.log("user after getting cms id", user)
                if (user.sdmUserRef && user.sdmCorpRef) {
                    kafkaService.kafkaSync({
                        set: this.set,
                        cms: {
                            update: true,
                            argv: JSON.stringify(user)
                        },
                        inQ: true
                    })
                }
                return user
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createUserOnCms", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Update user on CMS
     * @param payload 
     */
    async updateUserOnCms(payload: IUserRequest.IUserData) {
        try {
            let res = await CMS.UserCMSE.updateCustomerOnCms(payload)
            consolelog(process.cwd(), "updateUserOnCms", res, false)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "updateUserOnCms", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const UserE = new UserEntity()
