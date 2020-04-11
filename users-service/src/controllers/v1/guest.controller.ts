import * as Constant from '../../constant'
import { formatUserData, consolelog, generateOtp } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import * as CMS from '../../cms';
import * as SDM from '../../sdm';
import { addressController } from './address.controller';

export class GuestController {

    constructor() { }

    /**
     * @method POST
     * */
    async guestLogin(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestLogin) {
        try {
            // headers.deviceid = headers.deviceid + Math.random()
            let userId = ENTITY.UserE.ObjectId().toString()
            let tempUser: IUserRequest.IUserData = {
                id: userId,
                profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                brand: headers.brand,
                country: headers.country,
                phnVerified: 0,
            }
            let userData = await ENTITY.UserE.buildUser(tempUser)
            let sessionUpdate: ISessionRequest.ISession = {
                isGuest: 1,
                userId: userData.id
            }
            let session = await ENTITY.SessionE.buildSession(headers, sessionUpdate)
            let tokens = await ENTITY.UserE.getTokens(
                headers.deviceid,
                headers.devicetype,
                [Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH, Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH],
                userData.id,
                1,
                session.sessionTime
            )
            return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, response: formatUserData(userData, headers, 1) }
        } catch (error) {
            consolelog(process.cwd(), "guestLogin", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
    * @method POST
    * @param {string} cCode : country code with +, eg: +976
    * @param {string} phnNo : phone number max length 9 digits
    * @param {string} email : email
    * @param {string} name : name
    * @param {string} isGuest : number
    * @param {string} addressId : number
    * @param {string} addressType 
    * */
    async guestCheckout(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestCheckout, auth: ICommonRequest.AuthorizationObj) {
        try {
            if (payload.email)
                payload.email = payload.email.toLowerCase()
            const otp = generateOtp()
            let address
            const fullPhnNo = payload.cCode + payload.phnNo;
            const username = headers.brand + "_" + fullPhnNo;
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            let phnVerified = 0
            if (payload.addressId && payload.addressType) {
                let oldAdd: IAddressRequest.IAddress = await ENTITY.AddressE.getAddress({
                    userId: auth.id,
                    bin: (payload.addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE) ? Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY : Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP,
                    addressId: payload.addressId
                })
                if (oldAdd && oldAdd.id)
                    address = oldAdd
                else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ADDRESS_NOT_FOUND)
            }
            let userchangePayload: IUserchangeRequest.IUserchange = {
                username: username,
                fullPhnNo: fullPhnNo,
                name: payload.name.trim(),
                email: payload.email,
                cCode: payload.cCode,
                phnNo: payload.phnNo,
                otp: otp,
                otpExpAt: new Date().getTime() + Constant.CONF.GENERAL.OTP_EXPIRE_TIME,
                otpVerified: 0,
                isGuest: payload.isGuest,
                brand: headers.brand,
                country: headers.country,
                profileStep: 1,
            }
            if (address && address.id)
                userchangePayload['address'] = address
            if (userData.sdmUserRef) {
                let userId = ENTITY.UserE.ObjectId().toString()
                let tempUser: IUserRequest.IUserData = {
                    id: userId,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    brand: headers.brand,
                    country: headers.country,
                    phnVerified: 0,
                }
                userData = await ENTITY.UserE.buildUser(tempUser)
                auth.id = userData.id
                if (address && address.id) {
                    if (address.addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY.TYPE)
                        delete address.storeId
                    address['addressId'] = address.id
                    delete address.sdmAddressRef
                    delete address.cmsAddressRef
                    delete userchangePayload['address']
                    await addressController.registerAddress(headers, address, auth);
                }
            }
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "username",
                    value: username
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let asUserByPhone: IUserRequest.IUserData[] = await Aerospike.query(queryArg)
            if (asUserByPhone && asUserByPhone.length > 0) {
                userchangePayload['id'] = asUserByPhone[0].id
                console.log("guestCheckout step 1=====================>")
                if (asUserByPhone[0].email == undefined || asUserByPhone[0].email == "" || asUserByPhone[0].email == payload.email) {
                    console.log("guestCheckout step 2=====================>")
                    userchangePayload['deleteUserId'] = auth.id
                    phnVerified = asUserByPhone[0].phnVerified
                } else {
                    console.log("guestCheckout step 3=====================>")
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
                        console.log("guestCheckout step 4=====================>")
                        return Constant.STATUS_MSG.SUCCESS.S216.USER_EMAIL_ALREADY_EXIST
                    } else {
                        console.log("guestCheckout step 5=====================>")
                        let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email }, headers)
                        if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                            console.log("guestCheckout step 6=====================>")
                            return Constant.STATUS_MSG.SUCCESS.S215.USER_PHONE_ALREADY_EXIST
                        } else {
                            console.log("guestCheckout step 7=====================>")
                            userchangePayload['chngEmailSdm'] = 1
                            userchangePayload['chngEmailCms'] = 1
                            delete userchangePayload.otp
                            delete userchangePayload.otpExpAt
                            delete userchangePayload.otpVerified
                            phnVerified = asUserByPhone[0].phnVerified
                        }
                    }
                }
                console.log("guestCheckout step 8=====================>")
                await ENTITY.UserchangeE.buildUserchange(asUserByPhone[0].id, userchangePayload, headers.language)
            } else {
                console.log("guestCheckout step 9=====================>")
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
                    console.log("guestCheckout step 10=====================>")
                    let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email }, headers)
                    if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                        console.log("guestCheckout step 11=====================>")
                        userchangePayload['id'] = auth.id
                        userchangePayload['deleteUserId'] = ""
                        userchangePayload['chngPhnSdm'] = 1
                        userchangePayload['sdmUserRef'] = parseInt(sdmUserByEmail.CUST_ID)
                        userchangePayload['sdmCorpRef'] = parseInt(sdmUserByEmail.CUST_CORPID)
                        userchangePayload['cmsUserRef'] = 0
                    } else {
                        console.log("guestCheckout step 12=====================>")
                        userchangePayload['id'] = auth.id
                        userchangePayload['deleteUserId'] = ""
                        userchangePayload['sdmUserRef'] = 0
                        userchangePayload['sdmCorpRef'] = 0
                        userchangePayload['cmsUserRef'] = 0
                    }
                    console.log("guestCheckout step 13=====================>")
                    await ENTITY.UserchangeE.buildUserchange(auth.id, userchangePayload, headers.language)
                }
            }
            userData['name'] = payload.name.trim()
            userData['email'] = payload.email
            userData['fullPhnNo'] = payload.cCode + payload.phnNo
            userData['phnNo'] = payload.phnNo
            userData['cCode'] = payload.cCode
            userData['phnVerified'] = phnVerified
            userData['profileStep'] = 0
            console.log("guestCheckout step 14=====================>", userchangePayload)

            if (userchangePayload['chngEmailSdm'] || userchangePayload['chngEmailCms']) {
                userData = await this.forceUpdateUserOnGuestCheckout(headers, userData, userchangePayload)
            }
            return formatUserData(userData, headers, payload.isGuest)
        } catch (error) {
            consolelog(process.cwd(), "guestCheckout", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async forceUpdateUserOnGuestCheckout(headers: ICommonRequest.IHeaders, userData: IUserRequest.IUserData, userchangePayload: IUserchangeRequest.IUserchange) {
        try {
            let userUpdate = {
                id: userchangePayload.id,
                phnVerified: 1,
            }
            if (userchangePayload.fullPhnNo)
                userUpdate['fullPhnNo'] = userchangePayload.fullPhnNo
            if (userchangePayload.username)
                userUpdate['username'] = userchangePayload.username
            if (userchangePayload.cCode)
                userUpdate['cCode'] = userchangePayload.cCode
            if (userchangePayload.phnNo)
                userUpdate['phnNo'] = userchangePayload.phnNo
            if (userchangePayload.name)
                userUpdate['name'] = userchangePayload.name
            if (userchangePayload.email)
                userUpdate['email'] = userchangePayload.email
            if (userchangePayload.profileStep != undefined)
                userUpdate['profileStep'] = userchangePayload.profileStep
            if (userchangePayload.brand)
                userUpdate['brand'] = userchangePayload.brand
            if (userchangePayload.country)
                userUpdate['country'] = userchangePayload.country

            userData = await ENTITY.UserE.buildUser(userUpdate)

            if (userData.cmsUserRef && userData.cmsUserRef != 0 && (userchangePayload.chngEmailCms || userchangePayload.chngPhnCms))
                CMS.UserCMSE.updateCustomerOnCms(userData)

            if (userData.sdmUserRef && userData.sdmUserRef != 0 && (userchangePayload.chngEmailSdm || userchangePayload.chngPhnSdm)) {
                SDM.UserSDME.updateCustomerOnSdm(userData, headers)
            }
            return userData
        } catch (error) {
            consolelog(process.cwd(), "forceUpdateUserOnGuestCheckout", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const guestController = new GuestController();