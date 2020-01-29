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
            bin: 'username',
            index: 'idx_' + this.set + '_' + 'username',
            type: "STRING"
        }
    ]

    constructor() {
        super('user')
    }

    public userSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        username: Joi.string().trim().required().description("sk - unique"),
        brand: Joi.string().valid(Constant.DATABASE.BRAND.KFC, Constant.DATABASE.BRAND.PH),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        email: Joi.string().email().lowercase().trim().required(),
        fullPhnNo: Joi.string().trim().required(),
        cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
        phnNo: Joi.string().trim().required(),
        sdmUserRef: Joi.number().required(),
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
        createdAt: Joi.number().required(),
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
            } else {
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
            }
        } catch (error) {
            consolelog(process.cwd(), "getUser", error, false)
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
            let isCreate = false
            let userUpdate: IUserRequest.IUserData = {}
            userUpdate['id'] = payload.id
            if (payload.username)
                userUpdate['username'] = payload.username
            if (payload.brand)
                userUpdate['brand'] = payload.brand
            if (payload.country)
                userUpdate['country'] = payload.country
            if (payload.email)
                userUpdate['email'] = payload.email
            if (payload.fullPhnNo)
                userUpdate['fullPhnNo'] = payload.fullPhnNo
            if (payload.cCode)
                userUpdate['cCode'] = payload.cCode
            if (payload.phnNo)
                userUpdate['phnNo'] = payload.phnNo
            if (payload.sdmUserRef)
                userUpdate['sdmUserRef'] = payload.sdmUserRef
            if (payload.cmsUserRef)
                userUpdate['cmsUserRef'] = payload.cmsUserRef
            if (payload.phnVerified != undefined)
                userUpdate['phnVerified'] = payload.phnVerified
            if (payload.name)
                userUpdate['name'] = payload.name
            if (payload.socialKey)
                userUpdate['socialKey'] = payload.socialKey
            if (payload.socialKey)
                userUpdate['medium'] = payload.medium
            if (payload.profileStep != undefined)
                userUpdate['profileStep'] = payload.profileStep
            userUpdate['password'] = "Password1"
            if (payload.cartId)
                userUpdate['cartId'] = payload.cartId
            if (payload.createdAt)
                userUpdate['createdAt'] = payload.createdAt


            let checkUser = await this.getUser({ userId: payload.id })
            if (checkUser && checkUser.id) {
                isCreate = false
            } else {
                isCreate = true
                let cartId = payload.cartId
                this.createDefaultCart(cartId, userUpdate.id)
            }
            let putArg: IAerospike.Put = {
                bins: userUpdate,
                set: this.set,
                key: payload.id,
            }
            if (isCreate)
                putArg['create'] = true
            else
                putArg['update'] = true
            await Aerospike.put(putArg)
            let user = await this.getUser({ userId: payload.id })
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
