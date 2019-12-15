'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'

export class CmsEntity extends BaseEntity {
    constructor() {
        super('Cms')
    }

    async getTokens(deviceid: string, devicetype: string, tokentype: string[], authCred?: IAuthServiceRequest.IAuthCred) {
        try {
            if (tokentype && tokentype.length > 0) {
                let promise = []
                tokentype.map(elem => {
                    let createTokenData = {
                        deviceid: deviceid,
                        devicetype: devicetype,
                        tokenType: elem,
                        authCred: authCred,
                    }
                    return promise.push(authService.createToken(createTokenData))
                })
                let tokens: IAuthServiceRequest.IToken[] = await Promise.all(promise)

                let res = {
                    accessToken: undefined,
                    refreshToken: undefined
                }
                tokentype.map((elem, i) => {
                    if (elem == Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH || elem == Constant.DATABASE.TYPE.TOKEN.CMS_AUTH) {
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
            consolelog(process.cwd(),"getTokens", err, false)
            return Promise.reject(err)
        }
    }
}

export const CmsE = new CmsEntity()
