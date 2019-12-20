'use strict';
import * as config from 'config';
import * as Jwt from 'jsonwebtoken';
import * as Constant from '../constant';
const cert = config.get('jwtSecret')
import { consolelog } from '../utils'

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
                case Constant.DATABASE.TYPE.TOKEN.CMS_AUTH: {
                    expiretime = Constant.SERVER.REFRESH_TOKEN_EXPIRE_TIME
                    // tokenData["exp"] = Math.floor(Date.now() / 1000) + expiretime
                    break;
                }
                default: {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
                }
            }
            const token = await Jwt.sign(tokenData, cert, { algorithm: 'HS256' });
            consolelog(process.cwd(),'token', token, false)

            return token
        } catch (error) {
            consolelog(process.cwd(),'setToken', error, false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
        }
    };

    async  verifyToken(token: string) {
        try {
            const tokenData: IAuthGrpcRequest.ICreateTokenData = await Jwt.verify(token, cert, { algorithms: ['HS256'] });
            consolelog(process.cwd(),'tokenManager : verifyToken', [JSON.stringify(token), JSON.stringify(tokenData)], true)
            switch (tokenData.tokenType) {
                case Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH: {
                    if (tokenData.id) {
                        consolelog(process.cwd(),"tokenData.id", tokenData.id, true)
                        const tokenVerifiedData: ICommonRequest.AuthorizationObj = {
                            tokenType: tokenData.tokenType,
                            deviceid: tokenData.deviceid,
                            devicetype: tokenData.devicetype,
                            id: tokenData.id,
                        };
                        return tokenVerifiedData
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
                }
                case Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH: {
                    if (tokenData.id) {
                        consolelog(process.cwd(),"tokenData.id", tokenData.id, true)
                        const tokenVerifiedData: ICommonRequest.AuthorizationObj = {
                            tokenType: tokenData.tokenType,
                            deviceid: tokenData.deviceid,
                            devicetype: tokenData.devicetype,
                            id: tokenData.id,
                        };
                        return tokenVerifiedData
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
                }
                case Constant.DATABASE.TYPE.TOKEN.USER_AUTH: {
                    if (tokenData.id) {
                        consolelog(process.cwd(),"tokenData.id", tokenData.id, true)
                        const tokenVerifiedData: ICommonRequest.AuthorizationObj = {
                            tokenType: tokenData.tokenType,
                            deviceid: tokenData.deviceid,
                            devicetype: tokenData.devicetype,
                            id: tokenData.id,
                        };
                        return tokenVerifiedData
                    } else
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E401.UNAUTHORIZED)
                }
                case Constant.DATABASE.TYPE.TOKEN.CMS_AUTH: {
                    const tokenVerifiedData: ICommonRequest.AuthorizationObj = {
                        tokenType: tokenData.tokenType,
                        deviceid: tokenData.deviceid,
                        devicetype: tokenData.devicetype,
                        id: tokenData.id ? tokenData.id : undefined,
                        // userData: {},
                        authCred: tokenData.authCred
                    };
                    return tokenVerifiedData
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



// export let decodeToken = async function (token: string) {
//     let decodedData = Jwt.verify(token, cert, { algorithms: ['HS256'] })
//     if (decodedData) {
//         return decodedData
//     } else {
//         return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//     }

// };

// export let updateRefreshToken = async function (userData, tokenData) {
//     try {
//         let payload = {
//             deviceid: "123",
//             deviceType: "123",   // dumy data not in use  just to make code reusable
//         }
//         let refreshToken: string
//         let criteria = {
//             _id: userData.id
//         }
//         let number = Math.floor(Math.random() * Constant.SERVER.RANDOM_NUMBER_REFRESH_TOKEN) + 1
//         if (tokenData.rNumber === number) {

//             refreshToken = await ENTITY.UserC.createToken(payload, userData['userData'], Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH)
//             ENTITY.UserC.updateOneEntity(criteria, { refreshToken })
//             return refreshToken
//         }
//         else {
//             let dbResponse = await ENTITY.UserC.getOneEntity(criteria, { refreshToken: 1 })
//             refreshToken = dbResponse['refreshToken']
//             return refreshToken
//         }
//     }
//     catch (error) {
//         return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//     }

// }