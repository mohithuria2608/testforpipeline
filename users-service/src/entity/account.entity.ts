'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'


export class AccountEntity extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'phnNo',
            index: 'idx_' + this.set + '_' + 'phnNo',
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
        super('account')
    }

    public accountSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        cCode: Joi.string().valid(Constant.DATABASE.CCODE.UAE).required(),
        phnNo: Joi.string().trim().required().description("sk"),
        sdmUserRef: Joi.number().required().description("sk"),
        cmsUserRef: Joi.number().required().description("sk"),
        phnVerified: Joi.number().valid(0, 1).required(),
        changePhnNo: Joi.number().valid(0, 1).required(),
        otp: Joi.number().default(0),
        otpExpAt: Joi.number().default(0),
        otpVerified: Joi.number().default(0),
    });

    async buildAccount(headers: ICommonRequest.IHeaders, account: IAccountRequest.IAccount) {
        try {
            if (account.id) {
                if (session && session.id) {
                    if (session.otpExpAt <= new Date().getTime() && session.otpExpAt != 0) {
                        if (payload.otp != undefined)
                            session['otp'] = session.otp
                        if (payload.otpExpAt != undefined)
                            session['otpExpAt'] = session.otpExpAt
                    } else {
                        if (payload.otp != undefined)
                            session['otp'] = payload.otp
                        if (payload.otpExpAt != undefined)
                            session['otpExpAt'] = payload.otpExpAt
                    }
                }
                else {
                    isCreate = true
                    session['id'] = generateSessionId(payload.userId, headers.deviceid)
                    if (payload.otp != undefined)
                        session['otp'] = payload.otp
                    if (payload.otpExpAt != undefined)
                        session['otpExpAt'] = payload.otpExpAt
                }

                if (payload.isGuest != undefined)
                    session['isGuest'] = payload.isGuest
                if (payload.otpVerified != undefined)
                    session['otpVerified'] = payload.otpVerified
                if (isCreate)
                    session['createdAt'] = new Date().getTime()
                if (headers.brand != undefined)
                    session['brand'] = headers.brand
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

                if (payload.sessionTime)
                    session['sessionTime'] = payload.sessionTime
                session['userId'] = payload.userId

                let putArg: IAerospike.Put = {
                    bins: session,
                    set: this.set,
                    key: session.id,
                    update: true
                    // ttl: payload.ttl,
                }
                await Aerospike.put(putArg)
                return session
            } else {

            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "validateOtp", error, false)
            return Promise.reject(error)
        }
    }

    async validateOtp(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthVerifyOtp, account: IAccountRequest.IAccount) {
        try {
            if (account.otp == 0 && account.otpExpAt == 0)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_SESSION_EXPIRED)
            if (account.otp != payload.otp)
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
            if (account.otpExpAt < new Date().getTime())
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_EXPIRED)
            let accountUpdate: IAccountRequest.IAccount = {
                id: account.id,
                otp: 0,
                otpExpAt: 0,
                otpVerified: 1
            }
            await this.buildAccount(headers, accountUpdate)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "validateOtp", error, false)
            return Promise.reject(error)
        }
    }
}

export const AccountE = new AccountEntity()
