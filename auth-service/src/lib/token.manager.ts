'use strict';
import * as config from 'config';
import * as Jwt from 'jsonwebtoken';
import * as Constant from '../constant/appConstants';
const cert = config.get('jwtSecret')
import { consolelog } from '../utils'


export class TokenManager {

    constructor() { }

    async setToken(tokenData: IAuthServiceRequest.ITokenData) {
        try {
            switch (tokenData.tokenType) {
                case Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH: {
                    break;
                }
                case Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH: {
                    break;
                }
                default: {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
                }
            }
            const token = await Jwt.sign(tokenData, cert, { algorithm: 'HS256' });
            consolelog('token', token, false)

            return token
        } catch (error) {
            consolelog('setToken', error, false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
        }
    };

    async  verifyToken(token) {
        try {
            const tokenData: IAuthServiceRequest.ITokenData = await Jwt.verify(token, cert, { algorithms: ['HS256'] });
            consolelog('verifyToken', [token, tokenData], true)
            switch (tokenData.tokenType) {
                case Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH: {
                    const tokenVerifiedData: IAuthServiceRequest.IPostVerifyTokenForUserRes = {
                        tokenType: tokenData.tokenType,
                        deviceId: tokenData.deviceId,
                        devicetype: tokenData.devicetype
                    };
                    return tokenVerifiedData
                }
                case Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH: {
                    break;
                }
                default: {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
                }
            }
        } catch (error) {
            return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
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
//             deviceId: "123",
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