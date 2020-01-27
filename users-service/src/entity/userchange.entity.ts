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
            bin: 'fullPhnNo',
            index: 'idx_' + this.set + '_' + 'fullPhnNo',
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
        fullPhnNo: Joi.string().trim().required().description("sk"),
        cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE),
        phnNo: Joi.string().trim(),
        phnVerified: Joi.number(),
        otp: Joi.number(),
        otpExpAt: Joi.number(),
        otpVerified: Joi.number(),
        name: Joi.string().email().lowercase().trim(),
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
        // deleteUserId: Joi.string(),
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
    * @param {IUserchangeRequest.IUserchange} curUserchnage 
    */
    async validateOtpOnPhnChange(payload: IUserRequest.IAuthVerifyOtp, curUserchnage: IUserchangeRequest.IUserchange) {
        try {
            if (curUserchnage && curUserchnage.id) {
                if (curUserchnage.cCode != payload.cCode || curUserchnage.phnNo != payload.phnNo)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
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
            consolelog(process.cwd(), "validateOtpOnPhnChange", error, false)
            return Promise.reject(error)
        }
    }

    async buildUserchange(payload: IUserchangeRequest.IUserchange, userData?: IUserRequest.IUserData) {
        try {
            let userId = (userData != undefined) ? userData.id : ""
            let isCreate = false
            let checkUserchange
            if (userId && userId != "") {
                checkUserchange[0] = await this.getUserchange({ userId: userId })
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
                checkUserchange = await Aerospike.query(queryArg)
            }
            if (checkUserchange && checkUserchange.length > 0 ) {
                isCreate = false
                userId = checkUserchange[0].id
            } else {
                isCreate = true
                userId = this.ObjectId.toString()
            }
            let dataToUpdateUserchange: IUserchangeRequest.IUserchange = {
                id: userId
            }
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
            // if (payload.deleteUserId)
            //     dataToUpdateUserchange['deleteUserId'] = payload.deleteUserId
            if (payload.profileStep != undefined)
                dataToUpdateUserchange['profileStep'] = payload.profileStep
            if (payload.phnVerified != undefined)
                dataToUpdateUserchange['phnVerified'] = payload.phnVerified

            let putArg: IAerospike.Put = {
                bins: dataToUpdateUserchange,
                set: this.set,
                key: dataToUpdateUserchange['id'],
            }
            if (isCreate)
                putArg['create'] = true
            else
                putArg['update'] = true

            await Aerospike.put(putArg)
            let getUserchange: IUserchangeRequest.IUserchange = await this.getUserchange({ userId: dataToUpdateUserchange['id'] })
            return getUserchange
        } catch (error) {
            consolelog(process.cwd(), "createUserchange", error, false)
            return Promise.reject(error)
        }
    }
}

export const UserchangeE = new UserchangeEntity()
