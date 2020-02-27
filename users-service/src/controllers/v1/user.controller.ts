import * as Constant from '../../constant'
import { consolelog, formatUserData } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService, notificationService } from '../../grpc/client';
import { addressController } from '../../controllers';
import * as CMS from '../../cms';
import * as SDM from '../../sdm';

export class UserController {
    constructor() { }

    /**
     * @description sync user to cms and sdm coming from KAFKA
     * @param {IKafkaGrpcRequest.IKafkaBody} payload 
     */
    async syncUser(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            if (payload.as && (payload.as.create || payload.as.update || payload.as.get || payload.as.sync)) {
                let data = JSON.parse(payload.as.argv)
                if (payload.as.create) {

                }
                if (payload.as.update) {
                    data['id'] = data.userId
                    await ENTITY.UserE.buildUser(data)
                }
            }
            if (payload.cms && (payload.cms.create || payload.cms.update || payload.cms.get || payload.cms.sync)) {
                let data = JSON.parse(payload.cms.argv)
                if (payload.cms.create)
                    await ENTITY.UserE.createUserOnCms(data)
                if (payload.cms.update)
                    await ENTITY.UserE.updateUserOnCms(data)
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.sync)) {
                let data = JSON.parse(payload.sdm.argv)
                if (payload.sdm.create)
                    await ENTITY.UserE.createUserOnSdm(data)
                if (payload.sdm.update)
                    await ENTITY.UserE.updateUserOnSdm(data)
                if (payload.sdm.sync)
                    await this.validateUserOnSdm(data, true)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} cCode : country code with +, eg: +976
    * */
    async loginSendOtp(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthSendOtp) {
        try {
            const fullPhnNo = payload.cCode + payload.phnNo;
            const username = headers.brand + "_" + fullPhnNo
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "username",
                    value: username
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (checkUser && checkUser.length > 0) {
                let userchangePayload: IUserchangeRequest.IUserchange = {
                    fullPhnNo: fullPhnNo,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isGuest: 0
                }
                await ENTITY.UserchangeE.buildUserchange(checkUser[0].id, userchangePayload)
            } else {
                let userchangePayload: IUserchangeRequest.IUserchange = {
                    username: username,
                    fullPhnNo: fullPhnNo,
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    brand: headers.brand,
                    country: headers.country,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isGuest: 0,
                    sdmUserRef: 0,
                    sdmCorpRef: 0,
                    cmsUserRef: 0,
                }
                let cmsUserByPhoneNo: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                if (cmsUserByPhoneNo && cmsUserByPhoneNo.customerId) {
                    userchangePayload['cmsUserRef'] = parseInt(cmsUserByPhoneNo.customerId)
                    if (cmsUserByPhoneNo.SdmUserRef)
                        userchangePayload['sdmUserRef'] = parseInt(cmsUserByPhoneNo.SdmUserRef)
                    if (cmsUserByPhoneNo.SdmCorpRef)
                        userchangePayload['sdmCorpRef'] = parseInt(cmsUserByPhoneNo.SdmCorpRef)
                    userchangePayload['email'] = cmsUserByPhoneNo.email
                    userchangePayload['name'] = cmsUserByPhoneNo.firstName + " " + cmsUserByPhoneNo.lastName
                    userchangePayload['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    if (cmsUserByPhoneNo.address && cmsUserByPhoneNo.address.length > 0) {
                        userchangePayload.cmsAddress = cmsUserByPhoneNo.address.slice(0, 6)
                    }
                }
                let userId = ENTITY.UserE.ObjectId().toString()
                let tempUser: IUserRequest.IUserData = {
                    id: userId,
                    cartId: userId,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    phnVerified: 0,
                    brand: headers.brand,
                    country: headers.country,
                }
                let user = await ENTITY.UserE.buildUser(tempUser)
                await ENTITY.UserchangeE.buildUserchange(user.id, userchangePayload)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "loginSendOtp", JSON.stringify(error), false)
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
            let userData: IUserRequest.IUserData
            let deleteUserId = ""
            const fullPhnNo = payload.cCode + payload.phnNo;
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "fullPhnNo",
                    value: fullPhnNo
                },
                set: ENTITY.UserchangeE.set,
                background: false,
            }
            let userchange: IUserchangeRequest.IUserchange[] = await Aerospike.query(queryArg)
            if (userchange && userchange.length > 0) {
                await ENTITY.UserchangeE.validateOtpOnPhnChange(payload, userchange[0])
                let userUpdate = {
                    id: userchange[0].id,
                    phnVerified: 1,
                }
                let asAddress = []
                let cmsAddress = []
                let sdmAddress = []
                if (userchange[0].fullPhnNo)
                    userUpdate['fullPhnNo'] = userchange[0].fullPhnNo
                if (userchange[0].username)
                    userUpdate['username'] = userchange[0].username
                if (userchange[0].cCode)
                    userUpdate['cCode'] = userchange[0].cCode
                if (userchange[0].phnNo)
                    userUpdate['phnNo'] = userchange[0].phnNo
                if (userchange[0].name)
                    userUpdate['name'] = userchange[0].name
                if (userchange[0].email)
                    userUpdate['email'] = userchange[0].email
                if (userchange[0].socialKey)
                    userUpdate['socialKey'] = userchange[0].socialKey
                if (userchange[0].medium)
                    userUpdate['medium'] = userchange[0].medium
                if (userchange[0].cartId)
                    userUpdate['cartId'] = userchange[0].cartId
                if (userchange[0].isGuest != undefined)
                    userUpdate['isGuest'] = userchange[0].isGuest
                if (userchange[0].profileStep != undefined)
                    userUpdate['profileStep'] = userchange[0].profileStep
                if (userchange[0].brand)
                    userUpdate['brand'] = userchange[0].brand
                if (userchange[0].country)
                    userUpdate['country'] = userchange[0].country
                if (userchange[0].sdmUserRef != undefined)
                    userUpdate['sdmUserRef'] = userchange[0].sdmUserRef
                if (userchange[0].sdmCorpRef != undefined)
                    userUpdate['sdmCorpRef'] = userchange[0].sdmCorpRef
                if (userchange[0].cmsUserRef != undefined)
                    userUpdate['cmsUserRef'] = userchange[0].cmsUserRef
                if (userchange[0].asAddress && userchange[0].asAddress.length > 0) {
                    asAddress = userchange[0].asAddress
                    userUpdate['asAddress'] = []
                }
                if (userchange[0].cmsAddress && userchange[0].cmsAddress.length > 0) {
                    cmsAddress = userchange[0].cmsAddress
                    userUpdate['cmsAddress'] = []
                }
                if (userchange[0].sdmAddress && userchange[0].sdmAddress.length > 0) {
                    sdmAddress = userchange[0].sdmAddress
                    userUpdate['sdmAddress'] = []
                }
                if (userchange[0].deleteUserId)
                    deleteUserId = userchange[0].deleteUserId

                userData = await ENTITY.UserE.buildUser(userUpdate)

                console.log("userData", userData)
                if (userData.email && userData.phnNo && (userData.sdmUserRef == undefined || userData.sdmUserRef == 0 || userData.cmsUserRef == undefined || userData.cmsUserRef == 0))
                    await this.validateUserOnSdm(userData, false)

                if (asAddress && asAddress.length > 0) {
                }
                if (cmsAddress && cmsAddress.length > 0)
                    ENTITY.AddressE.createCmsAddOnAs(userData, cmsAddress)

                if (sdmAddress && sdmAddress.length > 0)
                    ENTITY.AddressE.createSdmAddOnCmsAndAs(userData, sdmAddress)

            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_OTP)
            }
            let sessionUpdate: ISessionRequest.ISession = {
                isGuest: payload.isGuest,
                userId: userData.id,
            }
            let session = await ENTITY.SessionE.buildSession(headers, sessionUpdate)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                userchange[0].id,
                payload.isGuest,
                session.sessionTime
            )
            if (userchange[0].address && userchange[0].address.id) {
                let bin = userchange[0].address.addressType == Constant.DATABASE.TYPE.ADDRESS.PICKUP ? Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP : Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
                if (deleteUserId && deleteUserId != "") {
                    let userDataToSend = await ENTITY.UserE.getUser({ userId: deleteUserId })
                    await ENTITY.AddressE.updateAddress({ addressId: userchange[0].address.id }, bin, userDataToSend, true)
                } else
                    await ENTITY.AddressE.updateAddress({ addressId: userchange[0].address.id }, bin, userData, true)
                await addressController.syncOldAddress(headers, userData.id, {
                    addressId: userchange[0].address.id,
                    storeId: (userchange[0].address.addressType == Constant.DATABASE.TYPE.ADDRESS.PICKUP) ? userchange[0].address.storeId : undefined,
                    lat: userchange[0].address.lat,
                    lng: userchange[0].address.lng,
                    bldgName: userchange[0].address.bldgName,
                    description: userchange[0].address.description,
                    flatNum: userchange[0].address.flatNum,
                    tag: userchange[0].address.tag
                });
            }
            if (deleteUserId && deleteUserId != "") {
                await Aerospike.remove({ set: ENTITY.UserE.set, key: deleteUserId })
                await ENTITY.SessionE.removeAllSessionRelatedToUserId(deleteUserId)
                Aerospike.remove({ key: deleteUserId, set: ENTITY.AddressE.set })
            }
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(userData, headers, payload.isGuest) }
        } catch (error) {
            consolelog(process.cwd(), "loginVerifyOtp", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @param {string} socialKey : social id
    * @param {string} medium : Social Platform type : FB, GOOGLE, APPLE
    * */
    async socialAuthValidate(headers: ICommonRequest.IHeaders, payload: IUserRequest.IAuthSocial) {
        try {
            let userData: IUserRequest.IUserData = {}
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'user',
                    func: Constant.DATABASE.UDF.USER.check_social_key,
                    args: [headers.brand, headers.country, payload.medium, payload.socialKey],
                    forEach: true
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let userObj: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (userObj && userObj.length > 0) {
                userData = userObj[0]
                let userUpdate: IUserRequest.IUserData = {
                    id: userObj[0].id,
                    name: payload.name,
                }
                if (payload.email)
                    userUpdate['email'] = payload.email
                if (userObj[0].phnVerified == 1) {
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                } else {
                    let userchange: IUserchangeRequest.IUserchange = {
                        fullPhnNo: userData.fullPhnNo,
                        cCode: userData.cCode,
                        phnNo: userData.phnNo,
                        otp: Constant.SERVER.BY_PASS_OTP,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        brand: headers.brand,
                        country: headers.country,
                    }
                    if (payload.email) {
                        let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                        if (cmsUserByEmail && cmsUserByEmail.customerId) {
                            if (cmsUserByEmail['phone'] && cmsUserByEmail['phone'] != userData.fullPhnNo)
                                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_PHONE_ALREADY_EXIST)
                            userUpdate['phnVerified'] = 1
                            userUpdate['cmsUserRef'] = parseInt(cmsUserByEmail.customerId)
                            userUpdate['name'] = cmsUserByEmail.firstName + " " + cmsUserByEmail.lastName
                            userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                            userUpdate['fullPhnNo'] = cmsUserByEmail.phone
                            userUpdate['cCode'] = cmsUserByEmail.phone.slice(0, 4)
                            userUpdate['phnNo'] = cmsUserByEmail.phone.slice(4)
                            delete userchange['fullPhnNo']
                            delete userchange['cCode']
                            delete userchange['phnNo']
                            delete userchange['otp']
                            delete userchange['otpExpAt']
                            delete userchange['otpVerified']
                            if (cmsUserByEmail.SdmUserRef && (cmsUserByEmail.SdmUserRef != null || cmsUserByEmail.SdmUserRef != "null") && (cmsUserByEmail.SdmUserRef != "0"))
                                userUpdate['sdmUserRef'] = parseInt(cmsUserByEmail.SdmUserRef)
                            if (cmsUserByEmail.SdmCorpRef && (cmsUserByEmail.SdmCorpRef != null || cmsUserByEmail.SdmCorpRef != "null") && (cmsUserByEmail.SdmCorpRef != "0"))
                                userUpdate['sdmCorpRef'] = parseInt(cmsUserByEmail.SdmCorpRef)
                            if (cmsUserByEmail.address && cmsUserByEmail.address.length > 0) {
                                userchange['cmsAddress'] = cmsUserByEmail.address.slice(0, 6)
                            }
                        }
                    }
                    await ENTITY.UserchangeE.buildUserchange(userData.id, userchange)
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                }
            } else {
                if (payload.email) {
                    let queryArg: IAerospike.Query = {
                        equal: {
                            bin: "email",
                            value: payload.email
                        },
                        set: ENTITY.UserE.set,
                        background: false,
                    }
                    userObj = await Aerospike.query(queryArg)
                    if (userObj && userObj.length > 0) {
                        userData = userObj[0]
                        let userUpdate: IUserRequest.IUserData = {
                            id: userObj[0].id,
                            name: payload.name,
                        }
                        if (userObj[0].phnVerified == 1) {
                            userData = await ENTITY.UserE.buildUser(userUpdate)
                        } else {
                            let userchange: IUserchangeRequest.IUserchange = {
                                fullPhnNo: userData.fullPhnNo,
                                cCode: userData.cCode,
                                phnNo: userData.phnNo,
                                otp: Constant.SERVER.BY_PASS_OTP,
                                otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                                otpVerified: 0,
                                brand: headers.brand,
                                country: headers.country,
                                email: payload.email
                            }
                            let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                            if (cmsUserByEmail && cmsUserByEmail.customerId) {
                                if (cmsUserByEmail['phone'] && cmsUserByEmail['phone'] != userData.fullPhnNo)
                                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_PHONE_ALREADY_EXIST)
                                userUpdate['phnVerified'] = 1
                                userUpdate['cmsUserRef'] = parseInt(cmsUserByEmail.customerId)
                                userUpdate['name'] = cmsUserByEmail.firstName + " " + cmsUserByEmail.lastName
                                userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                                userUpdate['fullPhnNo'] = cmsUserByEmail.phone
                                userUpdate['cCode'] = cmsUserByEmail.phone.slice(0, 4)
                                userUpdate['phnNo'] = cmsUserByEmail.phone.slice(4)
                                delete userchange['fullPhnNo']
                                delete userchange['cCode']
                                delete userchange['phnNo']
                                delete userchange['otp']
                                delete userchange['otpExpAt']
                                delete userchange['otpVerified']
                                if (cmsUserByEmail.SdmUserRef && (cmsUserByEmail.SdmUserRef != null || cmsUserByEmail.SdmUserRef != "null") && (cmsUserByEmail.SdmUserRef != "0"))
                                    userUpdate['sdmUserRef'] = parseInt(cmsUserByEmail.SdmUserRef)
                                if (cmsUserByEmail.SdmCorpRef && (cmsUserByEmail.SdmCorpRef != null || cmsUserByEmail.SdmCorpRef != "null") && (cmsUserByEmail.SdmCorpRef != "0"))
                                    userUpdate['sdmCorpRef'] = parseInt(cmsUserByEmail.SdmCorpRef)
                                if (cmsUserByEmail.address && cmsUserByEmail.address.length > 0) {
                                    userchange['cmsAddress'] = cmsUserByEmail.address.slice(0, 6)
                                }
                            } else {
                                await ENTITY.UserchangeE.buildUserchange(userData.id, userchange)
                            }
                            userData = await ENTITY.UserE.buildUser(userUpdate)
                        }
                    } else {
                        let userId = ENTITY.UserE.ObjectId().toString()
                        let createUser: IUserRequest.IUserData = {
                            id: userId,
                            cartId: userId,
                            profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                            phnVerified: 0,
                            socialKey: payload.socialKey,
                            brand: headers.brand,
                            country: headers.country,
                            medium: payload.medium,
                            name: payload.name,
                            email: payload.email ? payload.email : "",
                        }
                        let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                        if (cmsUserByEmail && cmsUserByEmail.customerId) {
                            createUser['phnVerified'] = 1
                            createUser['cmsUserRef'] = parseInt(cmsUserByEmail.customerId)
                            createUser['name'] = cmsUserByEmail.firstName + " " + cmsUserByEmail.lastName
                            createUser['fullPhnNo'] = cmsUserByEmail.phone
                            createUser['cCode'] = cmsUserByEmail.phone.slice(0, 4)
                            createUser['phnNo'] = cmsUserByEmail.phone.slice(4)
                            createUser['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                            if (cmsUserByEmail.SdmUserRef && (cmsUserByEmail.SdmUserRef != null || cmsUserByEmail.SdmUserRef != "null") && (cmsUserByEmail.SdmUserRef != "0"))
                                createUser['sdmUserRef'] = parseInt(cmsUserByEmail.SdmUserRef)
                            if (cmsUserByEmail.SdmCorpRef && (cmsUserByEmail.SdmCorpRef != null || cmsUserByEmail.SdmCorpRef != "null") && (cmsUserByEmail.SdmCorpRef != "0"))
                                createUser['sdmCorpRef'] = parseInt(cmsUserByEmail.SdmCorpRef)
                            if (cmsUserByEmail.address && cmsUserByEmail.address.length > 0) {
                                createUser['cmsAddress'] = cmsUserByEmail.address.slice(0, 6)
                            }
                        }
                        userData = await ENTITY.UserE.buildUser(createUser)
                    }
                } else {
                    let userId = ENTITY.UserE.ObjectId().toString()
                    let tempUser: IUserRequest.IUserData = {
                        id: userId,
                        cartId: userId,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                        phnVerified: 0,
                        socialKey: payload.socialKey,
                        brand: headers.brand,
                        country: headers.country,
                        medium: payload.medium,
                        name: payload.name,
                        email: payload.email ? payload.email : "",
                    }
                    userData = await ENTITY.UserE.buildUser(tempUser)
                }
            }
            if (userData.email && userData.phnNo && (userData.sdmUserRef == undefined || userData.sdmUserRef == 0 || userData.cmsUserRef == undefined || userData.cmsUserRef == 0))
                await this.validateUserOnSdm(userData, false)
            let sessionUpdate: ISessionRequest.ISession = {
                isGuest: 0,
                userId: userData.id,
            }
            let session = await ENTITY.SessionE.buildSession(headers, sessionUpdate)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.USER_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                userData.id,
                0,
                session.sessionTime
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(userData, headers, 0) }
        } catch (error) {
            consolelog(process.cwd(), "socialAuthValidate", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method PATCH
    * @param {string} cCode : country code with +, eg: +976
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} email : email
    * @param {string} name : name
    * */
    async createProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.ICreateProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            const fullPhnNo = payload.cCode + payload.phnNo;
            const username = headers.brand + "_" + fullPhnNo;
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            if (userData && userData.id) {
                if (userData && userData.id && userData.profileStep && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PROFILE_SETUP_ALLREADY_COMPLETE)
                if (userData.socialKey && userData.medium) {
                    let queryArg: IAerospike.Query = {
                        equal: {
                            bin: "username",
                            value: username
                        },
                        set: ENTITY.UserE.set,
                        background: false,
                    }
                    let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                    consolelog(process.cwd(), "checkUser", JSON.stringify(checkUser), false)
                    let userchangePayload = {
                        username: username,
                        fullPhnNo: fullPhnNo,
                        name: payload.name,
                        email: payload.email,
                        cCode: payload.cCode,
                        phnNo: payload.phnNo,
                        medium: userData.medium,
                        socialKey: userData.socialKey,
                        otp: Constant.SERVER.BY_PASS_OTP,
                        cartId: userData.id,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isGuest: 0,
                        profileStep: 1,
                        brand: headers.brand,
                        country: headers.country,
                        emailVerified: 1,
                    }
                    if (checkUser && checkUser.length > 0) {
                        userchangePayload['id'] = checkUser[0].id
                        userchangePayload['deleteUserId'] = auth.id
                        userchangePayload['sdmUserRef'] = checkUser[0].sdmUserRef
                        userchangePayload['sdmCorpRef'] = checkUser[0].sdmCorpRef
                        userchangePayload['cmsUserRef'] = checkUser[0].cmsUserRef
                        await ENTITY.UserchangeE.buildUserchange(checkUser[0].id, userchangePayload)
                    } else {
                        let cmsUserByPhoneNo: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                        if (cmsUserByPhoneNo && cmsUserByPhoneNo.customerId) {
                            if (cmsUserByPhoneNo['email'] && cmsUserByPhoneNo['email'] != payload.email)
                                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_PHONE_ALREADY_EXIST)
                            if (cmsUserByPhoneNo['email'])
                                userchangePayload['cmsUserRef'] = parseInt(cmsUserByPhoneNo.customerId)
                            userchangePayload['email'] = cmsUserByPhoneNo.email
                            userchangePayload['name'] = cmsUserByPhoneNo.firstName + " " + cmsUserByPhoneNo.lastName
                            userchangePayload['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                            if (cmsUserByPhoneNo.SdmUserRef)
                                userchangePayload['sdmUserRef'] = parseInt(cmsUserByPhoneNo.SdmUserRef)
                            if (cmsUserByPhoneNo.SdmCorpRef)
                                userchangePayload['sdmCorpRef'] = parseInt(cmsUserByPhoneNo.SdmCorpRef)
                            if (cmsUserByPhoneNo.address && cmsUserByPhoneNo.address.length > 0) {
                                userchangePayload['cmsAddress'] = cmsUserByPhoneNo.address.slice(0, 6)
                            }
                        } else {
                            userchangePayload['sdmUserRef'] = 0
                            userchangePayload['sdmCorpRef'] = 0
                            userchangePayload['cmsUserRef'] = 0
                        }
                        userchangePayload['id'] = auth.id
                        userchangePayload['deleteUserId'] = ""
                        await ENTITY.UserchangeE.buildUserchange(auth.id, userchangePayload)
                    }
                    userData['fullPhnNo'] = fullPhnNo
                    userData['phnNo'] = payload.phnNo
                    userData['cCode'] = payload.cCode
                    userData['profileStep'] = 1
                    userData['phnVerified'] = 0
                    userData['emailVerified'] = 1
                    return formatUserData(userData, headers, auth.isGuest)
                } else {
                    let userUpdate: IUserRequest.IUserData = {
                        id: userData.id,
                        name: payload.name,
                        email: payload.email,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                        emailVerified: 1,
                    }
                    let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                    if (cmsUserByEmail && cmsUserByEmail.customerId) {
                        if (cmsUserByEmail['phone'] && cmsUserByEmail['phone'] != fullPhnNo)
                            return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
                        userUpdate['phnVerified'] = 1
                        userUpdate['cmsUserRef'] = parseInt(cmsUserByEmail.customerId)
                        userUpdate['name'] = cmsUserByEmail.firstName + " " + cmsUserByEmail.lastName
                        userUpdate['fullPhnNo'] = cmsUserByEmail.phone
                        userUpdate['cCode'] = cmsUserByEmail.phone.slice(0, 4)
                        userUpdate['phnNo'] = cmsUserByEmail.phone.slice(4)
                        userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                        if (cmsUserByEmail.SdmUserRef && (cmsUserByEmail.SdmUserRef != null || cmsUserByEmail.SdmUserRef != "null") && (cmsUserByEmail.SdmUserRef != "0"))
                            userUpdate['sdmUserRef'] = parseInt(cmsUserByEmail.SdmUserRef)
                        if (cmsUserByEmail.SdmCorpRef && (cmsUserByEmail.SdmCorpRef != null || cmsUserByEmail.SdmCorpRef != "null") && (cmsUserByEmail.SdmCorpRef != "0"))
                            userUpdate['sdmCorpRef'] = parseInt(cmsUserByEmail.SdmCorpRef)
                        if (cmsUserByEmail.address && cmsUserByEmail.address.length > 0) {
                            userUpdate['cmsAddress'] = cmsUserByEmail.address.slice(0, 6)
                        }
                    }

                    userData = await ENTITY.UserE.buildUser(userUpdate)
                    console.log("hereeeeeeeeeeeeee", userData)
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        sdm: {
                            sync: true,
                            argv: JSON.stringify(userData)
                        }
                    })
                    return formatUserData(userData, headers, auth.isGuest)
                }
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.USER_NOT_FOUND)
            }
        } catch (error) {
            consolelog(process.cwd(), "profileUpdate", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async validateUserOnSdm(userData: IUserRequest.IUserData, async: boolean) {
        try {
            consolelog(process.cwd(), "validateUserOnSdm", JSON.stringify(userData), false)
            let updateOnSdm = false
            let updateOnCms = false
            let createOnSdm = false
            let createOnCms = false
            let updateAs = {}
            if (!userData.cmsUserRef || userData.cmsUserRef == 0) {
                let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: userData.email })
                if (cmsUserByEmail && cmsUserByEmail.customerId) {
                    updateOnCms = true
                    updateAs['cmsUserRef'] = parseInt(cmsUserByEmail.customerId)
                    if (cmsUserByEmail.SdmUserRef)
                        updateAs['sdmUserRef'] = parseInt(cmsUserByEmail.SdmUserRef)
                    if (cmsUserByEmail.SdmCorpRef)
                        updateAs['sdmCorpRef'] = parseInt(cmsUserByEmail.SdmCorpRef)
                    if (cmsUserByEmail.address && cmsUserByEmail.address.length > 0) {
                        userData.cmsAddress = cmsUserByEmail.address.slice(0, 6)
                    }
                } else
                    createOnCms = true
            }
            if (!userData.sdmUserRef || userData.sdmUserRef == 0) {
                let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: userData.email })
                if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                    updateOnSdm = true
                    updateAs['sdmUserRef'] = sdmUserByEmail.CUST_ID
                    updateAs['sdmCorpRef'] = sdmUserByEmail.CUST_CORPID
                    if (sdmUserByEmail.Addresses && sdmUserByEmail.Addresses.CC_ADDRESS && sdmUserByEmail.Addresses.CC_ADDRESS.length > 0) {
                        userData.sdmAddress = sdmUserByEmail.Addresses.CC_ADDRESS.slice((sdmUserByEmail.Addresses.CC_ADDRESS.length - 6) < 0 ? 0 : sdmUserByEmail.Addresses.CC_ADDRESS.length - 6, sdmUserByEmail.Addresses.CC_ADDRESS.length)
                    }
                } else
                    createOnSdm = true
            }
            if (createOnSdm) {
                if (async) {
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        sdm: {
                            create: true,
                            argv: JSON.stringify(userData)
                        }
                    })
                } else {
                    userData = await ENTITY.UserE.createUserOnSdm(userData)
                }
            }
            if (createOnCms) {
                if (async) {
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        cms: {
                            create: true,
                            argv: JSON.stringify(userData)
                        }
                    })
                } else {
                    userData = await ENTITY.UserE.createUserOnCms(userData)
                }
            }
            if (updateAs && Object.keys(updateAs).length > 0) {
                updateAs['id'] = userData.id
                userData = await ENTITY.UserE.buildUser(updateAs)
            }

            if (updateOnSdm) {
                if (async) {
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        sdm: {
                            update: true,
                            argv: JSON.stringify(userData)
                        }
                    })
                } else {
                    await SDM.UserSDME.updateCustomerOnSdm(userData)
                }
            }

            if (updateOnCms) {
                if (async) {
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        cms: {
                            update: true,
                            argv: JSON.stringify(userData)
                        }
                    })
                } else {
                    await CMS.UserCMSE.updateCustomerOnCms(userData)
                }
            }
            return userData
        } catch (error) {
            consolelog(process.cwd(), "validateUserOnSdm", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method PATCH
    * @param {string=} email : email
    * @param {string=} name : name
    * @param {string=} cCode : country code
    * @param {string=} phnNo : phone number
    * */
    async editProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.IEditProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            let dataToUpdate = {
                id: userData.id,
            }
            if (payload.name)
                dataToUpdate['name'] = payload.name
            if (payload.email)
                dataToUpdate['email'] = payload.email
            if (payload.cCode && payload.phnNo && (userData.phnNo != payload.phnNo) && (userData.cCode != payload.cCode)) {
                const fullPhnNo = payload.cCode + payload.phnNo;
                const username = headers.brand + "_" + fullPhnNo;
                let userchangePayload = {
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    otp: Constant.SERVER.BY_PASS_OTP,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    brand: headers.brand,
                    country: headers.country,
                }
                let queryArg: IAerospike.Query = {
                    equal: {
                        bin: "username",
                        value: username
                    },
                    set: ENTITY.UserE.set,
                    background: false,
                }
                let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                if (checkUser && checkUser.length > 0) {
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_PHONE_ALREADY_EXIST)
                }
                await ENTITY.UserchangeE.buildUserchange(userData.id, userchangePayload)
            }
            let user = await ENTITY.UserE.buildUser(dataToUpdate)
            if (payload.cCode && payload.phnNo && (userData.phnNo != payload.phnNo) && (userData.cCode != payload.cCode)) {
                user['fullPhnNo'] = payload.cCode + payload.phnNo
                user['phnNo'] = payload.phnNo
                user['cCode'] = payload.cCode
                user['phnVerified'] = 0
            }
            return formatUserData(user, headers, auth.isGuest)
        } catch (error) {
            consolelog(process.cwd(), "editProfile", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const userController = new UserController();