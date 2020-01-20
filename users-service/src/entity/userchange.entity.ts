'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class UserchangeEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'phnNo',
            index: 'idx_' + this.set + '_' + 'phnNo',
            type: "STRING"
        }
    ]

    constructor() {
        super('userchange')
    }

    public userchangeSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk, user id"),
        isGuest: Joi.number().valid(0, 1),
        /**
         * @description : phone number otp verify
         */
        otp: Joi.number(),
        otpExpAt: Joi.number(),
        otpVerified: Joi.number(),
        /**
         * @description : merge keys
         */
        cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE),
        phnNo: Joi.string().trim(),
        email: Joi.string().email().lowercase().trim(),
        profileStep: Joi.number().valid(
            Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
            Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
        ),
        socialKey: Joi.string().trim(),
        medium: Joi.string().trim().valid(
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.FB,
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.GOOGLE,
            Constant.DATABASE.TYPE.SOCIAL_PLATFORM.APPLE
        ).required(),
        cartId: Joi.string(),
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
            consolelog(process.cwd(), "getUserchange", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * 
    * @param {IUserRequest.IAuthVerifyOtp} payload 
    * @param {IUserRequest.IUserData} userData 
    */
    async validateOtpOnPhnChange(payload: IUserRequest.IAuthVerifyOtp, userData: IUserRequest.IUserData) {
        try {
            let getUserchange: IUserchangeRequest.IUserchange = await this.getUserchange({ userId: userData.id })
            consolelog(process.cwd(), "getUserchange", JSON.stringify(getUserchange), false)

            if (getUserchange && getUserchange.id) {
                if (getUserchange.cCode != payload.cCode || getUserchange.phnNo != payload.phnNo)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
                if (getUserchange.otp == 0 && getUserchange.otpExpAt == 0)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)
                if (getUserchange.otp != payload.otp)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
                if (getUserchange.otpExpAt < new Date().getTime())
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_EXPIRED)
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)
            }
            await Aerospike.remove({ set: this.set, key: userData.id })
            return getUserchange
        } catch (err) {
            consolelog(process.cwd(), "validateOtpOnPhnChange", err, false)
            return Promise.reject(err)
        }
    }

    async createUserchange(payload: IUserchangeRequest.IUserchange, userData: IUserRequest.IUserData) {
        try {
            let getUserchange: IUserchangeRequest.IUserchange = await this.getUserchange({ userId: userData.id })
            let dataToUpdateUserchange = {
                id: userData.id
            };
            if (payload.isGuest != undefined)
                dataToUpdateUserchange['isGuest'] = payload.isGuest
            if (payload.cCode)
                dataToUpdateUserchange['cCode'] = payload.cCode
            if (payload.phnNo)
                dataToUpdateUserchange['phnNo'] = payload.phnNo
            if (payload.otp)
                dataToUpdateUserchange['otp'] = payload.otp
            if (payload.otpExpAt)
                dataToUpdateUserchange['otpExpAt'] = payload.otpExpAt
            if (payload.otpVerified != undefined)
                dataToUpdateUserchange['otpVerified'] = payload.otpVerified
            if (payload.cartId)
                dataToUpdateUserchange['cartId'] = payload.cartId
            if (payload.name)
                dataToUpdateUserchange['name'] = payload.name
            if (payload.email)
                dataToUpdateUserchange['email'] = payload.email
            if (payload.cCode && payload.phnNo && payload.email && payload.name)
                dataToUpdateUserchange['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
            if (payload.socialKey != undefined)
                dataToUpdateUserchange['socialKey'] = payload.socialKey
            if (payload.medium != undefined)
                dataToUpdateUserchange['medium'] = payload.medium
            if (payload.deleteUserId)
                dataToUpdateUserchange['deleteUserId'] = payload.deleteUserId

            let putArg: IAerospike.Put = {
                bins: dataToUpdateUserchange,
                set: this.set,
                key: userData.id,
            }
            if (getUserchange && getUserchange.id) {
                putArg['update'] = true
            } else {
                putArg['create'] = true
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createUserchange", error, false)
            return Promise.reject(error)
        }
    }
}

export const UserchangeE = new UserchangeEntity()
