'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'

export class CmsEntity extends BaseEntity {
    constructor() {
        super('Cms')
    }

    async getTokens(deviceid: string, devicetype: string, tokentype: string[], id: string, authCred?: IAuthGrpcRequest.IAuthCred) {
        try {
            if (tokentype && tokentype.length > 0) {
                let promise = []
                tokentype.map(elem => {
                    let dataToSend = {
                        deviceid: deviceid,
                        devicetype: devicetype,
                        tokenType: elem,
                        authCred: authCred
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
                    if (elem == Constant.DATABASE.TYPE.TOKEN.CMS_AUTH) {
                        res['accessToken'] = tokens[i].token
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
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
}

export const CmsE = new CmsEntity()
