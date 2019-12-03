'use strict';
import { BaseEntity } from './base.entity'
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'

export class UserEntity extends BaseEntity {
    protected model = 'user'
    constructor() {
        super('user')
        // this.DAO.createSecondaryIndex('user', 'fullphnNo')
    }

    public addressSchema = Joi.object().keys({
        type: Joi.string(),
        city: Joi.string(),
        area: Joi.string(),
        road: Joi.string(),
        buildingName: Joi.string(),
        buildingNo: Joi.number(),
        floor: Joi.number(),
        pincode: Joi.number(),
        flatNo: Joi.string(),
        cCode: Joi.number(),
        provinceId: Joi.number(),
        addId: Joi.number()
    })

    public userSchema = Joi.object().keys({
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        userName: Joi.string().lowercase().trim().required(),
        cCode: Joi.string().trim().required(),
        phnNo: Joi.string().trim().regex(/^[0-9]+$/).required(),
        fullphnNo: Joi.string().trim().required(),
        phoneVerified: Joi.number().valid(1, 2).required(),
        dob: Joi.number(),
        email: Joi.string().lowercase().trim().required(),
        password: Joi.string().trim().required(),
        address: Joi.array().items(this.addressSchema),
        createdAt: Joi.number().required(),
    });

    async getTokens(deviceid: string, devicetype: string, tokentype: string[]) {
        try {
            if (tokentype && tokentype.length > 0) {
                let promise = []
                tokentype.map(elem => {
                    return promise.push(authService.createToken({
                        deviceid: deviceid,
                        devicetype: devicetype,
                        tokenType: elem
                    }))
                })
                let tokens: IAuthServiceRequest.IToken[] = await Promise.all(promise)

                let res = {
                    accessToken: undefined,
                    refreshToken: undefined
                }
                tokentype.map((elem, i) => {
                    if (elem == Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH) {
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
        } catch (err) {
            consolelog("getTokens", err, false)
            return Promise.reject(err)
        }
    }
}

export const UserE = new UserEntity()
