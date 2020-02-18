'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'
import { notificationService } from '../grpc/client';

export class UserchangeEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'fullPhnNo',
            index: 'idx_' + this.set + '_' + 'fullPhnNo',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'socialKey',
            index: 'idx_' + this.set + '_' + 'socialKey',
            type: "STRING"
        }
    ]

    constructor() {
        super(Constant.SET_NAME.USERCHANGE)
    }

    public userchangeSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk, user id"),
        username: Joi.string().trim().required().description("sk - unique"),
        brand: Joi.string().valid(Constant.DATABASE.BRAND.KFC, Constant.DATABASE.BRAND.PH),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        email: Joi.string().email().lowercase().trim().required(),
        fullPhnNo: Joi.string().trim().required(),
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
        createdAt: Joi.number().required(),

        /**
         * @description extra validator keys
         */
        isGuest: Joi.number().valid(0, 1),
        otp: Joi.number(),
        otpExpAt: Joi.number(),
        otpVerified: Joi.number(),
        deleteUserId: Joi.string(),
    });

    /**
     * @description Get userchange
     * @param userId 
     */
    async getUserchange(payload: IUserchangeRequest.IGetUserchange) {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: payload.userId
            }
            let change = await Aerospike.get(getArg)
            if (change && change.id) {
                return change
            } else {
                return {}
            }
        } catch (error) {
            consolelog(process.cwd(), "getUserchange", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * 
    * @param {IUserRequest.IAuthVerifyOtp} payload 
    * @param {IUserchangeRequest.IUserchange} curUserchnage 
    */
    async validateOtpOnPhnChange(payload: IUserRequest.IAuthVerifyOtp, curUserchnage: IUserchangeRequest.IUserchange) {
        try {
            if (curUserchnage && curUserchnage.id) {
                if (curUserchnage.fullPhnNo) {
                    if (curUserchnage.fullPhnNo != (payload.cCode + payload.phnNo))
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
                }
                if (curUserchnage.cCode && curUserchnage.phnNo) {
                    if (curUserchnage.cCode != payload.cCode || curUserchnage.phnNo != payload.phnNo)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
                }
                if (curUserchnage.otp == 0 && curUserchnage.otpExpAt == 0)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)
                if (curUserchnage.otp != payload.otp)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
                if (curUserchnage.otpExpAt < new Date().getTime())
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_EXPIRED)
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)
            }
            Aerospike.remove({ set: this.set, key: curUserchnage.id })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "validateOtpOnPhnChange", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async buildUserchange(userId: string, payload: IUserchangeRequest.IUserchange) {
        try {
            let isCreate = false
            let checkUserchange = await this.getUserchange({ userId: userId })
            if (checkUserchange && checkUserchange.id) {
                userId = checkUserchange.id
            } else {
                let queryArg: IAerospike.Query = {
                    set: this.set,
                    background: false,
                }
                if (payload.phnNo && payload.cCode) {
                    const fullPhnNo = payload.cCode + payload.phnNo;
                    queryArg['equal'] = {
                        bin: "fullPhnNo",
                        value: fullPhnNo
                    }
                    let userchangeByPhnNo = await Aerospike.query(queryArg)
                    if (userchangeByPhnNo && userchangeByPhnNo.length > 0) {
                        checkUserchange = userchangeByPhnNo[0]
                        userId = checkUserchange.id
                    } else {
                        isCreate = true
                    }
                }
                else {
                    isCreate = true
                }
            }
            let dataToUpdateUserchange: IUserchangeRequest.IUserchange = {
                id: userId
            }
            if (payload.username)
                dataToUpdateUserchange['username'] = payload.username
            if (payload.isGuest != undefined)
                dataToUpdateUserchange['isGuest'] = payload.isGuest
            if (payload.fullPhnNo)
                dataToUpdateUserchange['fullPhnNo'] = payload.fullPhnNo
            if (payload.cCode)
                dataToUpdateUserchange['cCode'] = payload.cCode
            if (payload.phnNo)
                dataToUpdateUserchange['phnNo'] = payload.phnNo
            if (payload.otp)
                dataToUpdateUserchange['otp'] = payload.otp
            if (payload.otpExpAt)
                dataToUpdateUserchange['otpExpAt'] = payload.otpExpAt
            if (payload.otpVerified)
                dataToUpdateUserchange['otpVerified'] = payload.otpVerified
            if (payload.name)
                dataToUpdateUserchange['name'] = payload.name
            if (payload.email)
                dataToUpdateUserchange['email'] = payload.email
            if (payload.socialKey)
                dataToUpdateUserchange['socialKey'] = payload.socialKey
            if (payload.medium)
                dataToUpdateUserchange['medium'] = payload.medium
            if (payload.cartId)
                dataToUpdateUserchange['cartId'] = payload.cartId
            if (payload.deleteUserId)
                dataToUpdateUserchange['deleteUserId'] = payload.deleteUserId
            if (payload.emailVerified != undefined)
                dataToUpdateUserchange['emailVerified'] = payload.emailVerified
            if (payload.profileStep != undefined)
                dataToUpdateUserchange['profileStep'] = payload.profileStep
            if (payload.address)
                dataToUpdateUserchange['address'] = payload.address


            if (payload.otp && payload.otp != 0 && payload.otpExpAt && payload.otpVerified == 0) {
                notificationService.sendSms({
                    message: payload.otp.toString(),
                    destination: payload.fullPhnNo.replace("+", ""),
                    type: 0,
                    dlr: 1,
                })
            }
            let putArg: IAerospike.Put = {
                bins: dataToUpdateUserchange,
                set: this.set,
                key: dataToUpdateUserchange['id'],
            }
            if (isCreate) {
                putArg['ttl'] = Constant.SERVER.USERCHANGE_TTL
                putArg['create'] = true
            }
            else
                putArg['update'] = true

            consolelog(process.cwd(), "putArg", JSON.stringify(putArg), false)
            await Aerospike.put(putArg)
            let getUserchange: IUserchangeRequest.IUserchange = await this.getUserchange({ userId: dataToUpdateUserchange['id'] })
            return getUserchange
        } catch (error) {
            consolelog(process.cwd(), "createUserchange", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const UserchangeE = new UserchangeEntity()
