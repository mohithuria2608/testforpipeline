import * as Constant from '../../constant'
import { consolelog, formatUserData, generateOtp } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import { kafkaService, notificationService } from '../../grpc/client';
import { addressController } from '../../controllers';
import * as CMS from '../../cms';
import * as SDM from '../../sdm';
import { parse } from 'path';

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
                    await ENTITY.UserE.buildUser(data)
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
            const otp = generateOtp()
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
                    otp: otp,
                    otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isGuest: 0
                }
                await ENTITY.UserchangeE.buildUserchange(checkUser[0].id, userchangePayload, headers.language)
            } else {
                let userchangePayload: IUserchangeRequest.IUserchange = {
                    username: username,
                    fullPhnNo: fullPhnNo,
                    cCode: payload.cCode,
                    phnNo: payload.phnNo,
                    brand: headers.brand,
                    country: headers.country,
                    otp: otp,
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
                    if (cmsUserByPhoneNo.SdmUserRef && (cmsUserByPhoneNo.SdmUserRef != null || cmsUserByPhoneNo.SdmUserRef != "null") && (cmsUserByPhoneNo.SdmUserRef != "0"))
                        userchangePayload['sdmUserRef'] = parseInt(cmsUserByPhoneNo.SdmUserRef)
                    if (cmsUserByPhoneNo.SdmCorpRef && (cmsUserByPhoneNo.SdmCorpRef != null || cmsUserByPhoneNo.SdmCorpRef != "null") && (cmsUserByPhoneNo.SdmCorpRef != "0"))
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
                await ENTITY.UserchangeE.buildUserchange(user.id, userchangePayload, headers.language)
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
                    userUpdate['sdmUserRef'] = parseInt(userchange[0].sdmUserRef.toString())
                if (userchange[0].sdmCorpRef != undefined)
                    userUpdate['sdmCorpRef'] = parseInt(userchange[0].sdmCorpRef.toString())
                if (userchange[0].cmsUserRef != undefined)
                    userUpdate['cmsUserRef'] = parseInt(userchange[0].cmsUserRef.toString())
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
                if (userData.email && userData.phnNo && (userData.sdmUserRef == undefined || userData.sdmUserRef == 0 || userData.cmsUserRef == undefined || userData.cmsUserRef == 0)) {
                    await this.validateUserOnSdm(userData, false, headers)

                    // send welcome email on first time user create
                    notificationService.sendNotification({
                        toSendEmail: true,
                        emailCode: Constant.NOTIFICATION_CODE.EMAIL.USER_WELCOME_EMAIL,
                        emailDestination: userData.email,
                        language: headers.language,
                        payload: JSON.stringify({ email: { user: userData } })
                    });
                }

                if (userData.cmsUserRef && userData.cmsUserRef != 0 && (userchange[0].chngEmailCms || userchange[0].chngPhnCms))
                    CMS.UserCMSE.updateCustomerOnCms(userData)

                if (userData.sdmUserRef && userData.sdmUserRef != 0 && (userchange[0].chngEmailSdm || userchange[0].chngPhnSdm)) {
                    userData['headers'] = headers
                    SDM.UserSDME.updateCustomerOnSdm(userData)
                }

                if (asAddress && asAddress.length > 0) {
                }
                if (cmsAddress && cmsAddress.length > 0)
                    ENTITY.AddressE.createCmsAddOnAs(headers, userData, cmsAddress)

                if (sdmAddress && sdmAddress.length > 0)
                    ENTITY.AddressE.createSdmAddOnCmsAndAs(headers, userData, sdmAddress)

            } else {
                console.log("user not found => invalid otp")
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
                    await ENTITY.AddressE.updateAddress(headers, { addressId: userchange[0].address.id }, bin, userDataToSend, true)
                } else
                    await ENTITY.AddressE.updateAddress(headers, { addressId: userchange[0].address.id }, bin, userData, true)
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
            const otp = generateOtp()
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
                console.log("step 1=====================>")
                userData = userObj[0]
                let userUpdate: IUserRequest.IUserData = {
                    id: userObj[0].id
                }
                if (payload.name.trim() && payload.name.trim() != "")
                    userUpdate['name'] = payload.name.trim()
                if (userObj[0].phnVerified == 1) {
                    console.log("step 2=====================>")
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                } else {
                    console.log("step 3=====================>")
                    let userchange: IUserchangeRequest.IUserchange = {
                        fullPhnNo: userData.fullPhnNo,
                        cCode: userData.cCode,
                        phnNo: userData.phnNo,
                        otp: otp,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        brand: headers.brand,
                        country: headers.country,
                    }
                    if (payload.email && payload.email != "") {
                        console.log("step 4=====================>")
                        userchange['email'] = payload.email
                        let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                        if (cmsUserByEmail && cmsUserByEmail.customerId) {
                            console.log("step 5=====================>")
                            if (cmsUserByEmail['phone'] && cmsUserByEmail['phone'] != userData.fullPhnNo)
                                return Constant.STATUS_MSG.SUCCESS.S215.USER_PHONE_ALREADY_EXIST
                            userUpdate['phnVerified'] = 1
                            userUpdate['cmsUserRef'] = parseInt(cmsUserByEmail.customerId)
                            userUpdate['name'] = cmsUserByEmail.firstName + " " + cmsUserByEmail.lastName
                            userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                            userUpdate['fullPhnNo'] = cmsUserByEmail.phone
                            userUpdate['cCode'] = cmsUserByEmail.phone.slice(0, 4)
                            userUpdate['phnNo'] = cmsUserByEmail.phone.slice(4)
                            userUpdate['email'] = payload.email
                            delete userchange['fullPhnNo']
                            delete userchange['cCode']
                            delete userchange['phnNo']
                            delete userchange['otp']
                            delete userchange['otpExpAt']
                            delete userchange['otpVerified']
                            delete userchange['email']
                            if (cmsUserByEmail.SdmUserRef && (cmsUserByEmail.SdmUserRef != null || cmsUserByEmail.SdmUserRef != "null") && (cmsUserByEmail.SdmUserRef != "0"))
                                userUpdate['sdmUserRef'] = parseInt(cmsUserByEmail.SdmUserRef)
                            if (cmsUserByEmail.SdmCorpRef && (cmsUserByEmail.SdmCorpRef != null || cmsUserByEmail.SdmCorpRef != "null") && (cmsUserByEmail.SdmCorpRef != "0"))
                                userUpdate['sdmCorpRef'] = parseInt(cmsUserByEmail.SdmCorpRef)
                            if (cmsUserByEmail.address && cmsUserByEmail.address.length > 0) {
                                userchange['cmsAddress'] = cmsUserByEmail.address.slice(0, 6)
                            }
                        }
                    }
                    await ENTITY.UserchangeE.buildUserchange(userData.id, userchange, headers.language)
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                }
            } else {
                console.log("step 6=====================>")
                let userId = ENTITY.UserE.ObjectId().toString()
                let createUser: IUserRequest.IUserData = {
                    id: userId,
                    cartId: userId,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    phnVerified: 0,
                    brand: headers.brand,
                    country: headers.country,
                    socialKey: payload.socialKey,
                    medium: payload.medium,
                    name: payload.name.trim() ? payload.name.trim() : undefined,
                    email: payload.email ? payload.email : undefined,
                }
                let userchange: IUserchangeRequest.IUserchange = {
                    brand: headers.brand,
                    country: headers.country,
                    socialKey: payload.socialKey,
                    medium: payload.medium,
                    name: payload.name.trim() ? payload.name.trim() : undefined,
                    email: payload.email ? payload.email : undefined
                }
                if (payload.email && payload.email != "") {
                    console.log("step 7=====================>")
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
                        console.log("step 8=====================>")
                        userchange['id'] = userObj[0].id
                        userData = await ENTITY.UserE.buildUser(userchange)
                    } else {
                        console.log("step 9=====================>")
                        let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                        if (cmsUserByEmail && cmsUserByEmail.customerId) {
                            console.log("step 10=====================>")
                            createUser['phnVerified'] = 1
                            createUser['cmsUserRef'] = parseInt(cmsUserByEmail.customerId)
                            createUser['name'] = (payload.name.trim() && payload.name.trim() != "") ? payload.name.trim() : cmsUserByEmail.firstName + " " + cmsUserByEmail.lastName
                            createUser['fullPhnNo'] = cmsUserByEmail.phone
                            createUser['cCode'] = cmsUserByEmail.phone.slice(0, 4)
                            createUser['phnNo'] = cmsUserByEmail.phone.slice(4)
                            createUser['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                            createUser['socialKey'] = payload.socialKey
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
                    console.log("step 11=====================>")
                    userData = await ENTITY.UserE.buildUser(createUser)
                    await ENTITY.UserchangeE.buildUserchange(userData.id, userchange, headers.language)
                }
            }
            console.log("step 12=====================>")

            if (userData.email && userData.phnNo && (userData.sdmUserRef == undefined || userData.sdmUserRef == 0 || userData.cmsUserRef == undefined || userData.cmsUserRef == 0))
                await this.validateUserOnSdm(userData, false, headers)
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
            const otp = generateOtp()
            const fullPhnNo = payload.cCode + payload.phnNo;
            const username = headers.brand + "_" + fullPhnNo;
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            if (userData && userData.id) {
                if (userData && userData.id && userData.profileStep && userData.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.PROFILE_SETUP_ALREADY_COMPLETE)
                if (userData.fullPhnNo && userData.fullPhnNo != "" && userData.fullPhnNo != fullPhnNo)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.INVALID_PHONE_NO)
                if (userData.socialKey && userData.medium) {
                    let queryArg: IAerospike.Query = {
                        equal: {
                            bin: "username",
                            value: username
                        },
                        set: ENTITY.UserE.set,
                        background: false,
                    }
                    let asUserByPhone: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                    consolelog(process.cwd(), "checkUser", JSON.stringify(asUserByPhone), false)
                    let userchangePayload = {
                        username: username,
                        fullPhnNo: fullPhnNo,
                        name: payload.name.trim(),
                        email: payload.email,
                        cCode: payload.cCode,
                        phnNo: payload.phnNo,
                        medium: userData.medium,
                        socialKey: userData.socialKey,
                        otp: otp,
                        cartId: userData.id,
                        otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isGuest: 0,
                        profileStep: 1,
                        brand: headers.brand,
                        country: headers.country,
                        emailVerified: 1,
                    }
                    if (asUserByPhone && asUserByPhone.length > 0) {
                        userchangePayload['id'] = asUserByPhone[0].id
                        console.log('STEP : 1               MS : P')
                        if (asUserByPhone[0].email == payload.email) {
                            console.log('STEP : 2               MS : P/E  , same user')
                            userchangePayload['deleteUserId'] = auth.id
                        } else {
                            console.log('STEP : 3               MS : P')
                            let queryArg: IAerospike.Query = {
                                equal: {
                                    bin: "email",
                                    value: payload.email
                                },
                                set: ENTITY.UserE.set,
                                background: false,
                            }
                            let asUserByEmail = await Aerospike.query(queryArg)
                            if (asUserByEmail && asUserByEmail.length > 0) {
                                console.log('STEP : 4               MS : P/E  , different user')
                                return Constant.STATUS_MSG.SUCCESS.S215.USER_PHONE_ALREADY_EXIST
                            } else {
                                console.log('STEP : 5               MS : P')
                                let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                                if (cmsUserByEmail && cmsUserByEmail.customerId) {
                                    console.log('STEP : 6               MS : P, CMS : E  different user')
                                    return Constant.STATUS_MSG.SUCCESS.S216.USER_EMAIL_ALREADY_EXIST
                                } else {
                                    console.log('STEP : 7               MS : P, CMS :, ')
                                    userchangePayload['chngEmailCms'] = 1
                                    let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: userData.email, language: headers.language })
                                    if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                        console.log('STEP : 8               MS : P, CMS :, SDM : E    different user')
                                        return Constant.STATUS_MSG.SUCCESS.S216.USER_EMAIL_ALREADY_EXIST
                                    } else {
                                        console.log('STEP : 9               MS : P, CMS :, SDM :    update email')
                                        userchangePayload['deleteUserId'] = auth.id
                                        userchangePayload['chngEmailSdm'] = 1
                                        userchangePayload['chngEmailCms'] = 1
                                    }
                                }
                            }
                        }
                        console.log("userchangePayload by phone : ", userchangePayload)
                        await ENTITY.UserchangeE.buildUserchange(asUserByPhone[0].id, userchangePayload, headers.language)
                    } else {
                        console.log('STEP : 10               MS : ')
                        let queryArg: IAerospike.Query = {
                            equal: {
                                bin: "email",
                                value: payload.email
                            },
                            set: ENTITY.UserE.set,
                            background: false,
                        }
                        let asUserByEmail = await Aerospike.query(queryArg)
                        if (asUserByEmail && asUserByEmail.length > 0) {
                            userchangePayload['id'] = asUserByEmail[0].id
                            console.log('STEP : 11               MS : E')
                            let cmsUserByPhone: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                            if (cmsUserByPhone && cmsUserByPhone.customerId) {
                                console.log('STEP : 12               MS : E , CMS : P   different user')
                                return Constant.STATUS_MSG.SUCCESS.S216.USER_EMAIL_ALREADY_EXIST
                            }
                            else {
                                console.log('STEP : 13               MS : E , CMS ')
                                userchangePayload['deleteUserId'] = ""
                                userchangePayload['chngPhnSdm'] = 1
                                userchangePayload['chngPhnCms'] = 1
                            }
                            console.log("userchangePayload by email : ", userchangePayload)
                            await ENTITY.UserchangeE.buildUserchange(asUserByEmail[0].id, userchangePayload, headers.language)
                        } else {
                            let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                            if (cmsUserByEmail && cmsUserByEmail.customerId) {
                                console.log('STEP : 14               MS :  , CMS: E ')
                                if (cmsUserByEmail.phone == fullPhnNo) {
                                    console.log('STEP : 15               MS :  , CMS : E')
                                    userchangePayload['id'] = auth.id
                                    userchangePayload['deleteUserId'] = ""
                                    userchangePayload['cmsUserRef'] = parseInt(cmsUserByEmail['customerId'])
                                    userchangePayload['sdmUserRef'] = parseInt(cmsUserByEmail['SdmUserRef'])
                                    userchangePayload['sdmCorpRef'] = parseInt(cmsUserByEmail['SdmCorpRef'])
                                } else {
                                    console.log('STEP : 16               MS :  , CMS : ')
                                    let cmsUserByPhone: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                                    if (cmsUserByPhone && cmsUserByPhone.customerId) {
                                        console.log('STEP : 17               MS :  , CMS : P   different user')
                                        return Constant.STATUS_MSG.SUCCESS.S215.USER_PHONE_ALREADY_EXIST
                                    }
                                    else {
                                        console.log('STEP : 18               MS :  , CMS :')
                                        userchangePayload['id'] = auth.id
                                        userchangePayload['deleteUserId'] = ""
                                        userchangePayload['chngPhnCms'] = 1
                                        userchangePayload['chngPhnSdm'] = 1
                                    }
                                }
                            } else {
                                console.log('STEP : 19               MS :  , CMS :')
                                let cmsUserByPhone: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                                if (cmsUserByPhone && cmsUserByPhone.customerId) {
                                    console.log('STEP : 20               MS :  , CMS : P')
                                    let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email, language: headers.language })
                                    if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                        console.log('STEP : 21               MS :  , CMS : P , SDM : E  different user')
                                        return Constant.STATUS_MSG.SUCCESS.S216.USER_EMAIL_ALREADY_EXIST
                                    }
                                    else {
                                        console.log('STEP : 22               MS :  , CMS : P , SDM : ')
                                        userchangePayload['id'] = auth.id
                                        userchangePayload['deleteUserId'] = ""
                                        userchangePayload['chngEmailCms'] = 1
                                        userchangePayload['chngEmailSdm'] = 1
                                        userchangePayload['cmsUserRef'] = parseInt(cmsUserByPhone['customerId'])
                                        userchangePayload['sdmUserRef'] = parseInt(cmsUserByPhone['SdmUserRef'])
                                        userchangePayload['sdmCorpRef'] = parseInt(cmsUserByPhone['SdmCorpRef'])
                                    }
                                } else {
                                    console.log('STEP : 23               MS :  , CMS :  , SDM : ')
                                    let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email, language: headers.language })
                                    if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                        console.log('STEP : 23               MS :  , CMS :  , SDM : E')
                                        userchangePayload['id'] = auth.id
                                        userchangePayload['deleteUserId'] = ""
                                        userchangePayload['chngPhnSdm'] = 1
                                        userchangePayload['sdmUserRef'] = parseInt(sdmUserByEmail.CUST_ID)
                                        userchangePayload['sdmCorpRef'] = parseInt(sdmUserByEmail.CUST_CORPID)
                                        userchangePayload['cmsUserRef'] = 0
                                    } else {
                                        console.log('STEP : 23               MS :  , CMS :  , SDM : ')
                                        userchangePayload['id'] = auth.id
                                        userchangePayload['deleteUserId'] = ""
                                        userchangePayload['sdmUserRef'] = 0
                                        userchangePayload['sdmCorpRef'] = 0
                                        userchangePayload['cmsUserRef'] = 0
                                    }
                                }
                            }
                            console.log("userchangePayload by new user : ", userchangePayload)
                            await ENTITY.UserchangeE.buildUserchange(auth.id, userchangePayload, headers.language)
                        }
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
                        name: payload.name.trim(),
                        email: payload.email,
                        profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                        emailVerified: 1,
                    }
                    let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                    if (cmsUserByEmail && cmsUserByEmail.customerId) {
                        if (cmsUserByEmail['phone'] && cmsUserByEmail['phone'] != fullPhnNo)
                            return Constant.STATUS_MSG.SUCCESS.S216.USER_EMAIL_ALREADY_EXIST
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
                        if (cmsUserByEmail.address && cmsUserByEmail.address.length > 0)
                            userUpdate['cmsAddress'] = cmsUserByEmail.address.slice(0, 6)
                    }
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                    userData['headers'] = headers
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        sdm: {
                            sync: true,
                            argv: JSON.stringify(userData)
                        },
                        inQ: true
                    });
                    // send welcome email
                    notificationService.sendNotification({
                        toSendEmail: true,
                        emailCode: Constant.NOTIFICATION_CODE.EMAIL.USER_WELCOME_EMAIL,
                        emailDestination: userData.email,
                        language: headers.language,
                        payload: JSON.stringify({ email: { user: userData } })
                    });
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

    async validateUserOnSdm(userData: IUserRequest.IUserData, async: boolean, headers?: ICommonRequest.IHeaders) {
        try {
            if (userData.headers && !headers)
                headers = userData.headers
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
                let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: userData.email, language: headers.language })
                if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                    updateOnSdm = true
                    updateAs['sdmUserRef'] = parseInt(sdmUserByEmail.CUST_ID)
                    updateAs['sdmCorpRef'] = parseInt(sdmUserByEmail.CUST_CORPID)
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
                        },
                        inQ: true
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
                        },
                        inQ: true
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
                        },
                        inQ: true
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
                        },
                        inQ: true
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
    * @param {string=} name : name
    * */
    async editProfile(headers: ICommonRequest.IHeaders, payload: IUserRequest.IEditProfile, auth: ICommonRequest.AuthorizationObj) {
        try {
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            let dataToUpdate = {
                id: userData.id
            }
            if (payload.name.trim() && payload.name.trim() != "")
                dataToUpdate['name'] = payload.name.trim()
            let user = await ENTITY.UserE.buildUser(dataToUpdate)
            return formatUserData(user, headers, auth.isGuest)
        } catch (error) {
            consolelog(process.cwd(), "editProfile", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }


}

export const userController = new UserController();