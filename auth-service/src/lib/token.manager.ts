'use strict';
import * as config from 'config';
import * as Jwt from 'jsonwebtoken';
import * as Constant from '../constant';
import { consolelog } from '../utils'
import * as ENTITY from '../entity'
const cert = config.get('jwtSecret')
const algo = config.get('jwtAlgo')

export class TokenManager {

    constructor() { }

    async setToken(tokenData: IAuthGrpcRequest.ICreateTokenData) {
        try {
            let expiretime = Constant.SERVER.ACCESS_TOKEN_EXPIRE_TIME
            switch (tokenData.tokenType) {
                case Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH: {
                    if (tokenData.id) {
                        // expiretime = Constant.SERVER.REFRESH_TOKEN_EXPIRE_TIME
                        // tokenData["exp"] = Math.floor(Date.now() / 1000) + expiretime
                        break;
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
                }
                case Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH: {
                    if (tokenData.id) {
                        expiretime = Constant.SERVER.REFRESH_TOKEN_EXPIRE_TIME
                        tokenData["exp"] = Math.floor(Date.now() / 1000) + expiretime
                        break;
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
                }
                case Constant.DATABASE.TYPE.TOKEN.USER_AUTH: {
                    if (tokenData.id) {
                        expiretime = Constant.SERVER.REFRESH_TOKEN_EXPIRE_TIME
                        tokenData["exp"] = Math.floor(Date.now() / 1000) + expiretime
                        break;
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
                }
                default: {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
                }
            }
            const token = await Jwt.sign(tokenData, cert, { algorithm: algo });
            consolelog(process.cwd(), 'token', token, false)

            return token
        } catch (error) {
            consolelog(process.cwd(), 'setToken', JSON.stringify(error), false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
        }
    };

    async  verifyToken(token: string) {
        try {
            const tokenData: IAuthGrpcRequest.ICreateTokenData = await Jwt.verify(token, cert, { algorithms: [algo] });
            consolelog(process.cwd(), "tokenData", JSON.stringify(tokenData), true)

            if (tokenData && tokenData.id && tokenData.deviceid) {
                let getSession = await ENTITY.SessionE.getSession(tokenData.deviceid, tokenData.id)
                if (getSession && getSession.id) {
                    if (tokenData.tokenType != Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH) {
                        if (getSession.sessionTime != tokenData.sessionTime)
                            return Promise.reject(Constant.STATUS_MSG.ERROR.E401.ACCESS_TOKEN_EXPIRED)
                    }
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)

            switch (tokenData.tokenType) {
                case Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH: {
                    if (tokenData.id) {
                        const tokenVerifiedData: ICommonRequest.AuthorizationObj = {
                            tokenType: tokenData.tokenType,
                            deviceid: tokenData.deviceid,
                            devicetype: tokenData.devicetype,
                            id: tokenData.id,
                            isGuest: tokenData.isGuest,
                            sessionTime: tokenData.sessionTime,
                        };
                        return tokenVerifiedData
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
                }
                case Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH: {
                    if (tokenData.id) {
                        const tokenVerifiedData: ICommonRequest.AuthorizationObj = {
                            tokenType: tokenData.tokenType,
                            deviceid: tokenData.deviceid,
                            devicetype: tokenData.devicetype,
                            id: tokenData.id,
                            isGuest: tokenData.isGuest,
                            sessionTime: tokenData.sessionTime
                        };
                        return tokenVerifiedData
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
                }
                case Constant.DATABASE.TYPE.TOKEN.USER_AUTH: {
                    if (tokenData.id) {
                        const tokenVerifiedData: ICommonRequest.AuthorizationObj = {
                            tokenType: tokenData.tokenType,
                            deviceid: tokenData.deviceid,
                            devicetype: tokenData.devicetype,
                            id: tokenData.id,
                            isGuest: tokenData.isGuest,
                            sessionTime: tokenData.sessionTime
                        };
                        return tokenVerifiedData
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
                }
                default: {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
                }
            }
        } catch (error) {
            return error
        }
    };
}

export const tokenManager = new TokenManager();