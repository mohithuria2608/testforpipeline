import * as Constant from '../../constant'
import { consolelog, formatUserData, generateOtp, deCryptData } from '../../utils'
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
                    await ENTITY.UserE.createUserOnCms(data.userData, data.headers)
                if (payload.cms.update)
                    await ENTITY.UserE.updateUserOnCms(data.userData, data.headers)
            }
            if (payload.sdm && (payload.sdm.create || payload.sdm.update || payload.sdm.get || payload.sdm.sync)) {
                let data = JSON.parse(payload.sdm.argv)
                if (payload.sdm.create)
                    await ENTITY.UserE.createUserOnSdm(data.userData, data.headers)
                if (payload.sdm.update)
                    await ENTITY.UserE.updateUserOnSdm(data.userData, data.headers)
                if (payload.sdm.sync)
                    await this.validateUserOnSdm(data.userData, true, data.headers)
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
                if (!await ENTITY.OtpcooldownE.checkOtpcooldown(checkUser[0].id))
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.OTP_RETRY_MAXED_OUT)
                let userchangePayload: IUserchangeRequest.IUserchange = {
                    fullPhnNo: fullPhnNo,
                    otp: otp,
                    otpExpAt: new Date().getTime() + Constant.CONF.GENERAL.OTP_EXPIRE_TIME,
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
                    otpExpAt: new Date().getTime() + Constant.CONF.GENERAL.OTP_EXPIRE_TIME,
                    otpVerified: 0,
                    isGuest: 0,
                    sdmUserRef: 0,
                    sdmCorpRef: 0,
                    cmsUserRef: 0,
                }
                let userId = ENTITY.UserE.ObjectId().toString()
                let tempUser: IUserRequest.IUserData = {
                    id: userId,
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
                if (userData.email && userData.phnNo && (userData.sdmUserRef == undefined || userData.sdmUserRef == 0 || userData.cmsUserRef == undefined || userData.cmsUserRef == 0)) {
                    this.validateUserOnSdm(userData, false, headers)

                    // send welcome email on first time user create
                    userData.password = deCryptData(userData.password);
                    notificationService.sendNotification({
                        toSendEmail: true,
                        emailCode: Constant.NOTIFICATION_CODE.EMAIL.USER_WELCOME_EMAIL,
                        emailDestination: userData.email,
                        language: headers.language,
                        payload: JSON.stringify({ email: { user: userData, isNewUser: true } })
                    });
                }

                if (userData.cmsUserRef && userData.cmsUserRef != 0 && (userchange[0].chngEmailCms || userchange[0].chngPhnCms))
                    CMS.UserCMSE.updateCustomerOnCms(userData)

                if (userData.sdmUserRef && userData.sdmUserRef != 0 && (userchange[0].chngEmailSdm || userchange[0].chngPhnSdm))
                    SDM.UserSDME.updateCustomerOnSdm(userData, headers)

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
                let bin = userchange[0].address.addressType == Constant.DATABASE.TYPE.ADDRESS.PICKUP.TYPE ? Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP : Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
                if (deleteUserId && deleteUserId != "") {
                    let userDataToSend = await ENTITY.UserE.getUser({ userId: deleteUserId })
                    await ENTITY.AddressE.updateAddress(headers, { addressId: userchange[0].address.id }, bin, userDataToSend, true)
                } else
                    await ENTITY.AddressE.updateAddress(headers, { addressId: userchange[0].address.id }, bin, userData, true)
                await addressController.syncOldAddress(headers, userData.id, {
                    addressType: userchange[0].address.addressType,
                    addressSubType: userchange[0].address.addressSubType,
                    addressId: userchange[0].address.id,
                    storeId: (userchange[0].address.addressType == Constant.DATABASE.TYPE.ADDRESS.PICKUP.TYPE) ? userchange[0].address.storeId : undefined,
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
            let updateName = false
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
                    id: userObj[0].id
                }
                if (payload.name && payload.name != "")
                    userUpdate['name'] = payload.name.trim()
                if (userObj[0].phnVerified == 1) {
                    console.log("socialAuthValidate step 1=====================>", userUpdate)
                    if (userObj[0].name != payload.name)
                        updateName = true
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                } else {
                    console.log("socialAuthValidate step 2=====================>")
                    let userchange: IUserchangeRequest.IUserchange = {
                        fullPhnNo: userData.fullPhnNo,
                        cCode: userData.cCode,
                        phnNo: userData.phnNo,
                        otp: otp,
                        otpExpAt: new Date().getTime() + Constant.CONF.GENERAL.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        brand: headers.brand,
                        country: headers.country,
                    }
                    if (payload.email && payload.email != "") {
                        console.log("socialAuthValidate step 3=====================>")
                        userchange['email'] = payload.email
                        let queryArg: IAerospike.Query = {
                            equal: {
                                bin: "email",
                                value: payload.email
                            },
                            set: ENTITY.UserE.set,
                            background: false,
                        }
                        let asUserByEmail: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                        if (asUserByEmail && asUserByEmail.length > 0) {
                            console.log("socialAuthValidate step 4=====================>", asUserByEmail)
                            if (!asUserByEmail[0].fullPhnNo || asUserByEmail[0].fullPhnNo == "") {
                                delete userchange['fullPhnNo']
                                delete userchange['cCode']
                                delete userchange['phnNo']
                                delete userchange['otp']
                                delete userchange['otpExpAt']
                                delete userchange['otpVerified']
                                delete userchange['email']
                            } else {
                                if (asUserByEmail[0].fullPhnNo && asUserByEmail[0].fullPhnNo != userData.fullPhnNo)
                                    return Constant.STATUS_MSG.SUCCESS.S215.USER_PHONE_ALREADY_EXIST
                                userUpdate['phnVerified'] = 1
                                userUpdate['cmsUserRef'] = asUserByEmail[0].cmsUserRef
                                userUpdate['sdmUserRef'] = asUserByEmail[0].sdmUserRef
                                userUpdate['sdmCorpRef'] = asUserByEmail[0].sdmCorpRef
                                userUpdate['name'] = asUserByEmail[0].name
                                userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                                userUpdate['fullPhnNo'] = asUserByEmail[0].fullPhnNo
                                userUpdate['cCode'] = asUserByEmail[0].cCode
                                userUpdate['phnNo'] = asUserByEmail[0].phnNo
                                userUpdate['email'] = payload.email
                                delete userchange['fullPhnNo']
                                delete userchange['cCode']
                                delete userchange['phnNo']
                                delete userchange['otp']
                                delete userchange['otpExpAt']
                                delete userchange['otpVerified']
                                delete userchange['email']
                                /**
                                 * @todo if this email user has address copy those addresses to current user
                                 */
                            }
                        }
                    }
                    await ENTITY.UserchangeE.buildUserchange(userData.id, userchange, headers.language)
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                }
            } else {
                console.log("socialAuthValidate step 5=====================>")
                let userId = ENTITY.UserE.ObjectId().toString()
                let createUser: IUserRequest.IUserData = {
                    id: userId,
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
                    console.log("socialAuthValidate step 6=====================>")
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
                        console.log("socialAuthValidate step 7=====================>")
                        userchange['id'] = userObj[0].id
                        userData = await ENTITY.UserE.buildUser(userchange)
                    } else {
                        userData = await ENTITY.UserE.buildUser(createUser)
                    }
                } else {
                    console.log("socialAuthValidate step 8=====================>")
                    userData = await ENTITY.UserE.buildUser(createUser)
                    await ENTITY.UserchangeE.buildUserchange(userData.id, userchange, headers.language)
                }
            }
            console.log("socialAuthValidate step 9=====================>")

            if (userData.email && userData.phnNo && (userData.sdmUserRef == undefined || userData.sdmUserRef == 0 || userData.cmsUserRef == undefined || userData.cmsUserRef == 0)) {
                this.validateUserOnSdm(userData, false, headers)
            }
            if (updateName) {
                CMS.UserCMSE.updateCustomerOnCms(userData)
                SDM.UserSDME.updateCustomerOnSdm(userData, headers)
            }

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
                    console.log("createProfile step 1=====================>")
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
                        otpExpAt: new Date().getTime() + Constant.CONF.GENERAL.OTP_EXPIRE_TIME,
                        otpVerified: 0,
                        isGuest: 0,
                        profileStep: 1,
                        brand: headers.brand,
                        country: headers.country,
                        emailVerified: 1,
                    }
                    if (asUserByPhone && asUserByPhone.length > 0) {
                        userchangePayload['id'] = asUserByPhone[0].id
                        console.log("createProfile step 2=====================>", asUserByPhone)
                        if (asUserByPhone[0].email == undefined || asUserByPhone[0].email == "" || asUserByPhone[0].email == payload.email) {
                            console.log("createProfile step 3=====================>")
                            userchangePayload['deleteUserId'] = auth.id
                        } else {
                            console.log("createProfile step 4=====================>")
                            let queryArg: IAerospike.Query = {
                                equal: {
                                    bin: "email",
                                    value: payload.email
                                },
                                set: ENTITY.UserE.set,
                                background: false,
                            }
                            let asUserByEmail = await Aerospike.query(queryArg)
                            console.log("createProfile step 5=====================>", asUserByEmail)

                            if (asUserByEmail && asUserByEmail.length > 0 && asUserByEmail[0].profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST) {
                                console.log("createProfile step 5.1=====================>")
                                return Constant.STATUS_MSG.SUCCESS.S215.USER_PHONE_ALREADY_EXIST
                            } else {
                                console.log("createProfile step 6=====================>")
                                let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email }, headers)
                                if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                    console.log("createProfile step 7=====================>")
                                    return Constant.STATUS_MSG.SUCCESS.S215.USER_PHONE_ALREADY_EXIST
                                } else {
                                    console.log("createProfile step 8=====================>")
                                    userchangePayload['deleteUserId'] = auth.id
                                    userchangePayload['chngEmailSdm'] = 1
                                    userchangePayload['chngEmailCms'] = 1
                                }
                            }
                        }
                        console.log("createProfile step 9=====================>")
                        await ENTITY.UserchangeE.buildUserchange(asUserByPhone[0].id, userchangePayload, headers.language)
                    } else {
                        console.log("createProfile step 10=====================>")
                        let queryArg: IAerospike.Query = {
                            equal: {
                                bin: "email",
                                value: payload.email
                            },
                            set: ENTITY.UserE.set,
                            background: false,
                        }
                        let asUserByEmail = await Aerospike.query(queryArg)
                        if (asUserByEmail && asUserByEmail.length > 0 && asUserByEmail[0].profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST) {
                            return Constant.STATUS_MSG.SUCCESS.S216.USER_EMAIL_ALREADY_EXIST
                        } else {
                            console.log("createProfile step 11=====================>")
                            let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email }, headers)
                            if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                console.log("createProfile step 12=====================>")
                                userchangePayload['id'] = auth.id
                                userchangePayload['deleteUserId'] = ""
                                userchangePayload['chngPhnSdm'] = 1
                                userchangePayload['sdmUserRef'] = parseInt(sdmUserByEmail.CUST_ID)
                                userchangePayload['sdmCorpRef'] = parseInt(sdmUserByEmail.CUST_CORPID)
                                userchangePayload['cmsUserRef'] = 0
                            } else {
                                console.log("createProfile step 13=====================>")
                                userchangePayload['id'] = auth.id
                                userchangePayload['deleteUserId'] = ""
                                userchangePayload['sdmUserRef'] = 0
                                userchangePayload['sdmCorpRef'] = 0
                                userchangePayload['cmsUserRef'] = 0
                            }
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
                    let queryArg: IAerospike.Query = {
                        equal: {
                            bin: "email",
                            value: payload.email
                        },
                        set: ENTITY.UserE.set,
                        background: false,
                    }
                    let asUserByEmail: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
                    if (asUserByEmail && asUserByEmail.length > 0) {
                        console.log("createProfile step 14=====================>", asUserByEmail)
                        if (asUserByEmail[0].fullPhnNo && asUserByEmail[0].fullPhnNo != userData.fullPhnNo && asUserByEmail[0].profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.FIRST)
                            return Constant.STATUS_MSG.SUCCESS.S216.USER_EMAIL_ALREADY_EXIST
                        userUpdate['phnVerified'] = 1
                        userUpdate['cmsUserRef'] = asUserByEmail[0].cmsUserRef
                        userUpdate['sdmUserRef'] = asUserByEmail[0].sdmUserRef
                        userUpdate['sdmCorpRef'] = asUserByEmail[0].sdmCorpRef
                        userUpdate['name'] = asUserByEmail[0].name
                        userUpdate['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                        userUpdate['fullPhnNo'] = asUserByEmail[0].fullPhnNo
                        userUpdate['cCode'] = asUserByEmail[0].cCode
                        userUpdate['phnNo'] = asUserByEmail[0].phnNo
                        userUpdate['email'] = payload.email
                        /**
                         * @todo if this email user has address copy those addresses to current user
                         */
                    }
                    userData = await ENTITY.UserE.buildUser(userUpdate)
                    if (asUserByEmail && asUserByEmail.length > 0) {
                        let temDeleteUserIds = []
                        asUserByEmail.map(obj => {
                            if (obj.profileStep == Constant.DATABASE.TYPE.PROFILE_STEP.INIT)
                                temDeleteUserIds.push(obj.id)
                            return
                        })
                        ENTITY.UserE.removeTempUser(temDeleteUserIds, userData.id)
                    }
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        sdm: {
                            sync: true,
                            argv: JSON.stringify({
                                userData: userData,
                                headers: headers
                            })
                        },
                        inQ: true
                    });
                    // send welcome email
                    userData.password = deCryptData(userData.password);
                    notificationService.sendNotification({
                        toSendEmail: true,
                        emailCode: Constant.NOTIFICATION_CODE.EMAIL.USER_WELCOME_EMAIL,
                        emailDestination: userData.email,
                        language: headers.language,
                        payload: JSON.stringify({ email: { user: userData, isNewUser: true } })
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

    async validateUserOnSdm(userData: IUserRequest.IUserData, async: boolean, headers: ICommonRequest.IHeaders) {
        try {
            consolelog(process.cwd(), "validateUserOnSdm", JSON.stringify(userData), false)
            consolelog(process.cwd(), "headers", JSON.stringify(headers), false)
            let updateOnSdm = false
            let updateOnCms = false
            let createOnSdm = false
            let createOnCms = false
            let updateAs = {}
            if (!userData.cmsUserRef || userData.cmsUserRef == 0) {
                createOnCms = true
            }
            if (!userData.sdmUserRef || userData.sdmUserRef == 0) {
                let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: userData.email }, headers)
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
                            argv: JSON.stringify({
                                userData: userData,
                                headers: headers
                            })
                        },
                        inQ: true
                    })
                } else {
                    userData = await ENTITY.UserE.createUserOnSdm(userData, headers)
                }
            }
            if (createOnCms) {
                if (async) {
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        cms: {
                            create: true,
                            argv: JSON.stringify({
                                userData: userData,
                                headers: headers
                            })
                        },
                        inQ: true
                    })
                } else {
                    userData = await ENTITY.UserE.createUserOnCms(userData, headers)
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
                            argv: JSON.stringify({
                                userData: userData,
                                headers: headers
                            })
                        },
                        inQ: true
                    })
                } else {
                    await SDM.UserSDME.updateCustomerOnSdm(userData, headers)
                }
            }

            if (updateOnCms) {
                if (async) {
                    kafkaService.kafkaSync({
                        set: ENTITY.UserE.set,
                        cms: {
                            update: true,
                            argv: JSON.stringify({
                                userData: userData,
                                headers: headers
                            })
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
            if (payload.name && payload.name != "")
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