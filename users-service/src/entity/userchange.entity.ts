'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'
import { notificationService } from '../grpc/client';
import * as config from 'config';

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
        createdAt: Joi.number().required(),
        /**
         * @description extra validator keys
         */
        isGuest: Joi.number().valid(0, 1),
        otp: Joi.number(),
        otpExpAt: Joi.number(),
        otpVerified: Joi.number(),
        deleteUserId: Joi.string(),
        chngEmailCms: Joi.number(),
        chngPhnCms: Joi.number(),
        chngEmailSdm: Joi.number(),
        chngPhnSdm: Joi.number(),
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
            } else
                return {}
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
                    if (curUserchnage.fullPhnNo != (payload.cCode + payload.phnNo)) {
                        consolelog(process.cwd(), "incorrect phone number => invalid otp", "", true)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
                    }
                }
                if (curUserchnage.otp == 0 && curUserchnage.otpExpAt == 0)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)
                if (!((Constant.CONF.GENERAL.ENABLE_BYPASS && Constant.CONF.GENERAL.BY_PASS_OTP && (payload.otp == Constant.CONF.GENERAL.BY_PASS_OTP)) || (curUserchnage.otp == payload.otp))) {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
                }
                if (curUserchnage.otpExpAt < new Date().getTime())
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_EXPIRED)
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)
            }
            await Aerospike.remove({ set: this.set, key: curUserchnage.id })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "validateOtpOnPhnChange", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async buildUserchange(userId: string, payload: IUserchangeRequest.IUserchange, language: string = Constant.DATABASE.LANGUAGE.EN) {
        try {
            if (payload && Object.keys(payload).length > 0) {
                if (payload.fullPhnNo && payload.otp && payload.otpExpAt) {
                    let queryArg: IAerospike.Query = {
                        equal: {
                            bin: "fullPhnNo",
                            value: payload.fullPhnNo
                        },
                        set: this.set,
                        background: false,
                    }
                    let checkUserChange: IUserchangeRequest.IUserchange[] = await Aerospike.query(queryArg)
                    if (checkUserChange && checkUserChange.length > 0) {
                        if (checkUserChange[0].id && checkUserChange[0].otp && checkUserChange[0].otpExpAt) {
                            await Aerospike.remove({ set: this.set, key: checkUserChange[0].id })
                            if (checkUserChange[0].otpExpAt > new Date().getTime()) {
                                payload.otp = checkUserChange[0].otp
                                payload.otpExpAt = checkUserChange[0].otpExpAt
                            }
                        }
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
                if (payload.name && payload.name != "")
                    dataToUpdateUserchange['name'] = payload.name.trim()
                if (payload.email && payload.email != "")
                    dataToUpdateUserchange['email'] = payload.email
                if (payload.socialKey)
                    dataToUpdateUserchange['socialKey'] = payload.socialKey
                if (payload.medium)
                    dataToUpdateUserchange['medium'] = payload.medium
                if (payload.deleteUserId)
                    dataToUpdateUserchange['deleteUserId'] = payload.deleteUserId
                if (payload.emailVerified != undefined)
                    dataToUpdateUserchange['emailVerified'] = payload.emailVerified
                if (payload.profileStep != undefined)
                    dataToUpdateUserchange['profileStep'] = payload.profileStep
                if (payload.address)
                    dataToUpdateUserchange['address'] = payload.address
                if (payload.cmsUserRef != undefined)
                    dataToUpdateUserchange['cmsUserRef'] = parseInt(payload.cmsUserRef.toString())
                if (payload.sdmUserRef != undefined)
                    dataToUpdateUserchange['sdmUserRef'] = parseInt(payload.sdmUserRef.toString())
                if (payload.sdmCorpRef != undefined)
                    dataToUpdateUserchange['sdmCorpRef'] = parseInt(payload.sdmCorpRef.toString())
                if (payload.cmsAddress && payload.cmsAddress.length > 0)
                    dataToUpdateUserchange['cmsAddress'] = payload.cmsAddress
                if (payload.asAddress && payload.asAddress.length > 0)
                    dataToUpdateUserchange['asAddress'] = payload.asAddress
                if (payload.sdmAddress && payload.sdmAddress.length > 0)
                    dataToUpdateUserchange['sdmAddress'] = payload.sdmAddress
                if (payload.chngPhnCms != undefined)
                    dataToUpdateUserchange['chngPhnCms'] = payload.chngPhnCms
                if (payload.chngPhnSdm != undefined)
                    dataToUpdateUserchange['chngPhnSdm'] = payload.chngPhnSdm
                if (payload.chngEmailCms != undefined)
                    dataToUpdateUserchange['chngEmailCms'] = payload.chngEmailCms
                if (payload.chngEmailSdm != undefined)
                    dataToUpdateUserchange['chngEmailSdm'] = payload.chngEmailSdm
                if (payload.brand)
                    dataToUpdateUserchange['brand'] = payload.brand
                if (payload.country)
                    dataToUpdateUserchange['country'] = payload.country
                if (payload.fullPhnNo && payload.fullPhnNo != "" && payload.otp && payload.otp != 0 && payload.otpExpAt && payload.otpVerified == 0) {
                    notificationService.sendNotification({
                        toSendMsg: true,
                        msgCode: Constant.NOTIFICATION_CODE.SMS.USER_OTP_VERIFICATION,
                        msgDestination: encodeURIComponent(payload.fullPhnNo),
                        language: language,
                        payload: JSON.stringify({ msg: { otp: payload.otp, key: config.get("sms.android_key") } })
                    });
                }
                let putArg: IAerospike.Put = {
                    bins: dataToUpdateUserchange,
                    set: this.set,
                    key: dataToUpdateUserchange['id'],
                    createOrReplace: true
                }
                consolelog(process.cwd(), "putArg", JSON.stringify(putArg), false)
                await Aerospike.put(putArg)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "createUserchange", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const UserchangeE = new UserchangeEntity()
