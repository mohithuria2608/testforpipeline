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
            let token = await Jwt.sign(tokenData, cert, { algorithm: 'HS256' });
            consolelog('token', token, false)

            return token
        } catch (error) {
            consolelog('setToken', error, false)
            return Promise.reject(Constant.STATUS_MSG.ERROR.E501.TOKENIZATION_ERROR)
        }
    };
}

export const tokenManager = new TokenManager();



// export let verifyToken = async function (token, tokenType) {
//     try {
//         let result = await Jwt.verify(token, cert, { algorithms: ['HS256'] });
//         utils.consolelog('verifyToken', [tokenType, token, result], true)
//         if (tokenType == result['tokenType']) {
//             switch (result['tokenType']) {
//                 case Constant.DATABASE.TYPE.TOKEN.USER_AUTH: {
//                     let userData: any = {};
//                     let bucket = await utils.getBucket(result.id.toString())
//                     let checkValidSessionFromRedis = await REDIS_ENTITY.RedisStorageC.getKeyFromRedisHash(`${Constant.DATABASE.TYPE.REDIS_HASH_TYPES.SESSION}:${bucket}`, result.id.toString());
//                     checkValidSessionFromRedis = JSON.parse(checkValidSessionFromRedis)
//                     if (!checkValidSessionFromRedis) {
//                         userData = {};
//                         let userCriteria = { _id: result['id'] }
//                         let checkUserExist = await ENTITY.UserC.getOneEntity(userCriteria, {})
//                         if (!checkUserExist)
//                             return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//                         else {
//                             let sessionCriteria = {
//                                 userId: result['id'],
//                                 deviceId: result['deviceId'],
//                                 loginStatus: true
//                             };
//                             let checkValidSessionFromMongo = await ENTITY.SessionC.getOneEntity(sessionCriteria, { _id: 1 })
//                             if (!checkValidSessionFromMongo)
//                                 return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//                             else {
//                                 userData['id'] = checkUserExist['_id'];
//                                 userData['type'] = tokenType;
//                                 userData['userData'] = checkUserExist
//                                 userData["refreshToken"] = await updateRefreshToken(userData, result)
//                                 return userData
//                             }
//                         }
//                     } else {
//                         if (checkValidSessionFromRedis.deviceId != result.deviceId || !checkValidSessionFromRedis.loginStatus) {
//                             return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//                         } else {
//                             userData['id'] = checkValidSessionFromRedis['id'];
//                             userData['type'] = checkValidSessionFromRedis['tokenType'];
//                             userData['userData'] = JSON.parse(checkValidSessionFromRedis['userData'])
//                             userData["refreshToken"] = await updateRefreshToken(userData, result)
//                             return userData
//                         }
//                     }
//                 }
//                 case Constant.DATABASE.TYPE.TOKEN.VERIFY_EMAIL: {
//                     let userCriteria = {
//                         _id: result['id'],
//                         email: result['email']
//                     }
//                     let checkUserExist = await ENTITY.UserC.getOneEntity(userCriteria, {})
//                     if (!checkUserExist)
//                         return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//                     return checkUserExist
//                 }
//                 case Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH: {
//                     let userData: any = {};
//                     let userCriteria = { _id: result['id'] }
//                     let checkUserExist = await ENTITY.UserC.getOneEntity(userCriteria, {})
//                     if (!checkUserExist)
//                         return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//                     else {
//                         userData['id'] = checkUserExist['_id'];
//                         userData['type'] = tokenType;
//                         userData['userData'] = checkUserExist
//                         return userData
//                     }
//                 }
//             }
//         } else {
//             return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//         }

//     } catch (error) {
//         return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//     }
// };

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

// export let socketAuth = async function (userData: UserRequest.UserData, deviceId: string) {
//     try {
//         if (deviceId == undefined)
//             return true
//         let bucket = await utils.getBucket(userData._id.toString())
//         let checkValidSessionFromRedis = await REDIS_ENTITY.RedisStorageC.getKeyFromRedisHash(`${Constant.DATABASE.TYPE.REDIS_HASH_TYPES.SESSION}:${bucket}`, userData._id.toString());
//         checkValidSessionFromRedis = JSON.parse(checkValidSessionFromRedis)
//         if (!checkValidSessionFromRedis) {
//             let sessionCriteria = {
//                 userId: userData._id,
//                 deviceId: deviceId,
//                 loginStatus: true
//             };
//             let checkValidSessionFromMongo = await ENTITY.SessionC.getOneEntity(sessionCriteria, { _id: 1 })
//             if (!checkValidSessionFromMongo)
//                 return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//             else {
//                 return true
//             }
//         } else {
//             if (checkValidSessionFromRedis.deviceId != deviceId || !checkValidSessionFromRedis.loginStatus) {
//                 return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//             } else {
//                 return true
//             }
//         }
//     } catch (error) {
//         utils.consolelog('socketAuth', error, false)
//         return Promise.reject(Constant.STATUS_MSG.ERROR.E401.INVALID_TOKEN)
//     }
// }

