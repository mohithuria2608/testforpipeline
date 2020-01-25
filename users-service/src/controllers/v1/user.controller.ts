import * as Constant from '../../constant'
import { consolelog, formatUserData } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService } from '../../grpc/client';

export class UserController {
    constructor() { }

    /**
     * @description sync user to cms and sdm coming from KAFKA
     * @param {IKafkaGrpcRequest.IKafkaBody} payload 
     */
    async syncUserFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        // try {
        //     let data = JSON.parse(payload.as.argv)
        //     if (payload.as.create || payload.as.update || payload.as.get) {
        //         if (payload.as.create) {

        //         }
        //         if (payload.as.update)
        //             ENTITY.UserE.updateUser(data.userId, { cartId: data.cartId })
        //     }
        //     if (payload.cms.create || payload.cms.update || payload.cms.get) {
        //         if (payload.cms.create)
        //             ENTITY.UserE.createUserOnCms(data)
        //     }
        //     if (payload.sdm.create || payload.sdm.update || payload.sdm.get) {
        //         if (payload.sdm.create)
        //             ENTITY.UserE.createUserOnSdm(data)
        //     }
        //     return {}
        // } catch (error) {
        //     consolelog(process.cwd(), "syncFromKafka", error, false)
        //     return Promise.reject(error)
        // }
    }

    /**
    * @method POST
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} cCode : country code with +, eg: +976
    * */
    async loginSendOtp(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthSendOtp) {
        try {
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.ACCOUNT.check_phone_exist,
                    args: [payload.cCode],
                    forEach: true
                },
                equal: {
                    bin: "phnNo",
                    value: payload.phnNo
                },
                set: ENTITY.AccountE.set,
                background: false,
            }
            let checkAccount: IAccountRequest.IAccount[] = await Aerospike.query(queryArg)
            if (checkAccount && checkAccount.length > 0) {
                let accountUpdate: IAccountRequest.IAccount = {
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                }
                let putArg: IAerospike.Put = {
                    bins: accountUpdate,
                    set: ENTITY.AccountE.set,
                    key: checkAccount[0].id,
                    ttl: Constant.SERVER.INITIAL_USER_TTL,
                    update: true,
                }
                await Aerospike.put(putArg)
            } else {
                let accountCreate: IAccountRequest.IAccount = {
                    id: ENTITY.AccountE.ObjectId.toString(),
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    sdmUserRef: 0,
                    cmsUserRef: 0,
                    phnVerified: 0,
                    changePhnNo: 0,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                }
                let putArg: IAerospike.Put = {
                    bins: accountCreate,
                    set: ENTITY.AccountE.set,
                    key: accountCreate.id,
                    ttl: Constant.SERVER.INITIAL_USER_TTL,
                    create: true,
                }
                await Aerospike.put(putArg)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "loginSendOtp", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} cCode : country code with +, eg: +976
    * @param {number} otp : 4 digit otp
    * @param {number} isGuest : guest checkout
    * */
    async verifyOtp(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthVerifyOtp) {
        try {
            // let sessionTime = Math.ceil((new Date().getTime()) / 1000)
            // let deleteUserId = ""
            // let userUpdate: IUserRequest.IUserUpdate = {
            //     cCode: payload.cCode,
            //     phnNo: payload.phnNo,
            //     phnVerified: 1
            // }
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.UDF.USER.check_phone_exist,
                    args: [payload.cCode],
                    forEach: true
                },
                equal: {
                    bin: "phnNo",
                    value: payload.phnNo
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let account: IAccountRequest.IAccount[] = await Aerospike.query(queryArg)
            if (account && account.length > 0) {
                if (account[0] && account[0].id && account[0].changePhnNo == 1) {
                    userUpdate['changePhnNo'] = 0
                    account[0] = await ENTITY.AccountE.validateOtp(headers, payload, account[0])

                    validateOtpOnPhnChange(payload, account[0])
                    if (userchange && userchange.isGuest != undefined)
                        payload.isGuest = userchange.isGuest
                    if (userchange.cCode)
                        userUpdate['cCode'] = userchange.cCode
                    if (userchange.phnNo)
                        userUpdate['phnNo'] = userchange.phnNo
                    if (userchange.cartId)
                        userUpdate['cartId'] = userchange.cartId
                    if (userchange.name)
                        userUpdate['name'] = userchange.name
                    if (userchange.email)
                        userUpdate['email'] = userchange.email
                    if (userchange.socialKey)
                        userUpdate['socialKey'] = userchange.socialKey
                    if (userchange.medium)
                        userUpdate['medium'] = userchange.medium
                    if (userchange.cCode && userchange.phnNo && userchange.email && userchange.name)
                        userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    if (userchange && userchange.deleteUserId && userchange.deleteUserId != "")
                        deleteUserId = userchange.deleteUserId
                }
                else {
                    if (account[0].email && account[0].name)
                        userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    await ENTITY.SessionE.validateOtp(headers, payload, account[0], sessionTime)
                }
                account[0] = await ENTITY.UserE.updateUser(account[0].id, userUpdate)
            } else {
                let queryArg: IAerospike.Query = {
                    udf: {
                        module: 'user',
                        func: Constant.UDF.USER.check_phone_exist,
                        args: [payload.cCode],
                        forEach: true
                    },
                    equal: {
                        bin: "phnNo",
                        value: payload.phnNo
                    },
                    set: ENTITY.UserchangeE.set,
                    background: false,
                }
                let userchange: IUserchangeRequest.IUserchange[] = await Aerospike.query(queryArg)
                if (userchange && userchange.length > 0) {
                    if (userchange[0].deleteUserId)
                        deleteUserId = userchange[0].deleteUserId
                    account[0] = await ENTITY.UserE.getUser({ userId: userchange[0].id })
                    userchange[0] = await ENTITY.UserchangeE.validateOtpOnPhnChange(payload, account[0])
                    if (userchange[0] && userchange[0].isGuest != undefined)
                        payload.isGuest = userchange[0].isGuest
                    let userUpdate: IUserRequest.IUserUpdate = {
                        cCode: payload.cCode,
                        phnNo: payload.phnNo,
                        phnVerified: 1,
                        changePhnNo: 0,
                    }
                    if (userchange && userchange[0].isGuest != undefined)
                        payload.isGuest = userchange[0].isGuest
                    if (userchange[0].cCode)
                        userUpdate['cCode'] = userchange[0].cCode
                    if (userchange[0].phnNo)
                        userUpdate['phnNo'] = userchange[0].phnNo
                    if (userchange[0].cartId)
                        userUpdate['cartId'] = userchange[0].cartId
                    if (userchange[0].name)
                        userUpdate['name'] = userchange[0].name
                    if (userchange[0].email)
                        userUpdate['email'] = userchange[0].email
                    if (userchange[0].socialKey)
                        userUpdate['socialKey'] = userchange[0].socialKey
                    if (userchange[0].medium)
                        userUpdate['medium'] = userchange[0].medium
                    account[0] = await ENTITY.UserE.updateUser(account[0].id, userUpdate)
                    if (account[0].email && account[0].name && account[0].cCode && account[0].phnNo) {
                        account[0] = await ENTITY.UserE.updateUser(account[0].id, { profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST })
                    }
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
            }
            if (deleteUserId && deleteUserId != "") {
                await Aerospike.remove({ set: ENTITY.UserE.set, key: deleteUserId })
                await ENTITY.SessionE.removeAllSessionRelatedToUserId(deleteUserId)
            }
            let sessionUpdate: ISessionRequest.ISession = {
                otp: 0,
                otpExpAt: 0,
                otpVerified: 1,
                isGuest: payload.isGuest,
                sessionTime: sessionTime,
                userId: account[0].id
            }
            await ENTITY.SessionE.buildSession(headers, sessionUpdate)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                account[0].id,
                payload.isGuest,
                sessionTime
            )
            account[0]['isGuest'] = payload.isGuest
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(account[0], headers) }
        } catch (error) {
            consolelog(process.cwd(), "loginVerifyOtp", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    // /**
    // * @method POST
    // * @param {string} socialKey : social id
    // * @param {string} medium : Social Platform type : FB, GOOGLE
    // * */
    // async socialAuthValidate(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthSocial) {
    //     try {
    //         let sessionTime = Math.ceil((new Date().getTime()) / 1000)
    //         let queryArg: IAerospike.Query = {
    //             udf: {
    //                 module: 'user',
    //                 func: Constant.UDF.USER.check_social_key,
    //                 args: [payload.medium, payload.socialKey],
    //                 forEach: true
    //             },
    //             set: ENTITY.UserE.set,
    //             background: false,
    //         }
    //         let userObj: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
    //         if (userObj && userObj.length > 0) {
    //             if (userObj[0].phnNo && userObj[0].phnNo != "" && userObj[0].phnVerified == 1) {
    //                 let userUpdate: IUserRequest.IUserUpdate = {
    //                     name: payload.name,
    //                 }
    //                 if (payload.email)
    //                     userUpdate['email'] = payload.email
    //                 let session = {
    //                     isGuest: 0,
    //                     otp: 0,
    //                     otpExpAt: 0,
    //                     otpVerified: 1,
    //                     sessionTime: sessionTime,
    //                     userId: userObj[0].id
    //                     // ttl: Constant.SERVER.OTP_EXPIRE_TIME
    //                 }
    //                 userObj[0] = await ENTITY.UserE.updateUser(userObj[0].id, userUpdate)
    //                 await ENTITY.SessionE.buildSession(headers, session)
    //             } else {
    //                 let userUpdate: IUserRequest.IUserUpdate = {
    //                     name: payload.name,
    //                 }
    //                 if (payload.email) {
    //                     userUpdate['email'] = payload.email
    //                 }
    //                 if (userObj[0].profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.INIT)
    //                     userUpdate['phnVerified'] = 0

    //                 let session = {
    //                     otp: Constant.SERVER.BY_PASS_OTP,
    //                     otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
    //                     otpVerified: 0,
    //                     isGuest: 0,
    //                     sessionTime: sessionTime,
    //                     userId: userObj[0].id,
    //                     // ttl: Constant.SERVER.OTP_EXPIRE_TIME
    //                 }
    //                 await ENTITY.SessionE.buildSession(headers, session)
    //                 userObj[0] = await ENTITY.UserE.updateUser(userObj[0].id, userUpdate)
    //             }
    //         } else {
    //             let userCreate: IUserRequest.IUserUpdate = {
    //                 socialKey: payload.socialKey,
    //                 medium: payload.medium,
    //                 email: payload.email ? payload.email : "",
    //                 name: payload.name,
    //                 createdAt: new Date().getTime(),
    //                 phnVerified: 0,
    //                 profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
    //             }
    //             userObj[0] = await ENTITY.UserE.createUser(headers, userCreate)
    //             let session = {
    //                 isGuest: 0,
    //                 otp: 0,
    //                 otpExpAt: 0,
    //                 otpVerified: 1,
    //                 sessionTime: sessionTime,
    //                 userId: userObj[0].id
    //                 // ttl: Constant.SERVER.OTP_EXPIRE_TIME
    //             }
    //             await ENTITY.SessionE.buildSession(headers, session)
    //         }
    //         let tokens = await ENTITY.UserE.getTokens(
    //             headers.deviceid,
    //             headers.devicetype,
    //             [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
    //             userObj[0].id,
    //             0,
    //             sessionTime
    //         )
    //         return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(userObj[0], headers) }
    //     } catch (error) {
    //         consolelog(process.cwd(), "socialAuthValidate", error, false)
    //         return Promise.reject(error)
    //     }
    // }

    // /**
    // * @method PATCH
    // * @param {string} cCode : country code with +, eg: +976
    // * @param {string} phnNo : phone number max length 9 digits
    // * @param {string} email : email
    // * @param {string} name : name
    // * @param {string=} socialKey : social id
    // * @param {string=} medium : Social Platform type : FB, GOOGLE
    // * */
    // async createProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.ICreateProfile, auth: ICommonRequest.AuthorizationObj) {
    //     try {
    //         let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
    //         if (userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
    //             return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PROFILE_SETUP_ALLREADY_COMPLETE)
    //         let userUpdate = {
    //             name: payload.name,
    //             email: payload.email,
    //         }
    //         if (payload.socialKey && payload.medium) {
    //             userUpdate['changePhnNo'] = 1
    //             let queryArg: IAerospike.Query = {
    //                 udf: {
    //                     module: 'user',
    //                     func: Constant.UDF.USER.check_phone_exist,
    //                     args: [payload.cCode],
    //                     forEach: true
    //                 },
    //                 equal: {
    //                     bin: "phnNo",
    //                     value: payload.phnNo
    //                 },
    //                 set: ENTITY.UserE.set,
    //                 background: false,
    //             }
    //             let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
    //             let userchangePayload = {
    //                 name: payload.name,
    //                 email: payload.email,
    //                 cCode: payload.cCode,
    //                 phnNo: payload.phnNo,
    //                 medium: payload.medium,
    //                 socialKey: payload.socialKey,
    //                 otp: Constant.SERVER.BY_PASS_OTP,
    //                 cartId: userData.cartId,
    //                 otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
    //                 otpVerified: 0,
    //                 isGuest: 0,
    //             }
    //             if (checkUser && checkUser.length > 0) {
    //                 userchangePayload['deleteUserId'] = userData.id
    //                 userData = checkUser[0]
    //             } else {
    //                 userchangePayload['deleteUserId'] = ""
    //             }
    //             userData = await ENTITY.UserE.updateUser(userData.id, userUpdate)
    //             await ENTITY.UserchangeE.createUserchange(userchangePayload, userData)
    //             userData['phnVerified'] = 0
    //             userData['name'] = payload.name
    //             userData['email'] = payload.email
    //             userData['cCode'] = payload.cCode
    //             userData['phnNo'] = payload.phnNo
    //             userData['medium'] = payload.medium
    //             userData['socialKey'] = payload.socialKey
    //             userData['isGuest'] = 0
    //             return formatUserData(userData, headers)
    //         } else {
    //             userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
    //             let user = await ENTITY.UserE.updateUser(userData.id, userUpdate)
    //             return formatUserData(user, headers)
    //         }
    //     } catch (error) {
    //         consolelog(process.cwd(), "profileUpdate", error, false)
    //         return Promise.reject(error)
    //     }
    // }

    // /**
    // * @method PATCH
    // * @param {string=} email : email
    // * @param {string=} name : name
    // * @param {string=} cCode : country code
    // * @param {string=} phnNo : phone number
    // * */
    // async editProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.IEditProfile, auth: ICommonRequest.AuthorizationObj) {
    //     try {
    //         let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
    //         let dataToUpdate = {}
    //         if (payload.name)
    //             dataToUpdate['name'] = payload.name
    //         if (payload.email)
    //             dataToUpdate['email'] = payload.email
    //         if (payload.cCode && payload.phnNo) {
    //             let userchangePayload = {
    //                 cCode: payload.cCode,
    //                 phnNo: payload.phnNo,
    //                 otp: Constant.SERVER.BY_PASS_OTP,
    //                 otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
    //                 otpVerified: 0
    //             }
    //             let queryArg: IAerospike.Query = {
    //                 udf: {
    //                     module: 'user',
    //                     func: Constant.UDF.USER.check_phone_exist,
    //                     args: [payload.cCode],
    //                     forEach: true
    //                 },
    //                 equal: {
    //                     bin: "phnNo",
    //                     value: payload.phnNo
    //                 },
    //                 set: ENTITY.UserE.set,
    //                 background: false,
    //             }
    //             let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
    //             if (checkUser && checkUser.length > 0) {
    //                 userchangePayload['cartId'] = userData.cartId
    //                 userchangePayload['deleteUserId'] = checkUser[0].id
    //                 userData = checkUser[0]
    //             }
    //             dataToUpdate['changePhnNo'] = 1
    //             await ENTITY.UserchangeE.createUserchange(userchangePayload, userData)
    //         }
    //         let user = await ENTITY.UserE.updateUser(auth.id, dataToUpdate)
    //         if (payload.cCode && payload.phnNo) {
    //             user['phnVerified'] = 0;
    //             user['cCode'] = payload.cCode
    //             user['phnNo'] = payload.phnNo
    //         }
    //         // ENTITY.UserE.syncUser(user)
    //         return formatUserData(user, headers)
    //     } catch (error) {
    //         consolelog(process.cwd(), "editProfile", error, false)
    //         return Promise.reject(error)
    //     }
    // }
}

export const userController = new UserController();