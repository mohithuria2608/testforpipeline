import * as Constant from '../../constant'
import { formatUserData, consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../aerospike'
import * as CMS from '../../cms';
import * as SDM from '../../sdm';

export class GuestController {

    constructor() { }

    /**
     * @method POST
     * */
    async guestLogin(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestLogin) {
        try {
            let userId = ENTITY.UserE.ObjectId().toString()
            let tempUser: IUserRequest.IUserData = {
                id: userId,
                profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                brand: headers.brand,
                country: headers.country,
                cartId: userId,
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
    // async guestCheckout(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestCheckout, auth: ICommonRequest.AuthorizationObj) {
    //     try {
    //         let address
    //         const fullPhnNo = payload.cCode + payload.phnNo;
    //         const username = headers.brand + "_" + fullPhnNo;
    //         let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
    //         let queryArg: IAerospike.Query = {
    //             equal: {
    //                 bin: "username",
    //                 value: username
    //             },
    //             set: ENTITY.UserE.set,
    //             background: false,
    //         }
    //         let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)

    //         if (payload.addressId && payload.addressType) {
    //             let oldAdd: IAddressRequest.IAddress = await ENTITY.AddressE.getAddress({
    //                 userId: auth.id,
    //                 bin: (payload.addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY) ? Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY : Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP,
    //                 addressId: payload.addressId
    //             })
    //             if (oldAdd && oldAdd.id)
    //                 address = oldAdd
    //             else
    //                 return Promise.reject(Constant.STATUS_MSG.ERROR.E409.ADDRESS_NOT_FOUND)
    //         }
    //         let userchangePayload = {
    //             username: username,
    //             fullPhnNo: fullPhnNo,
    //             name: payload.name,
    //             email: payload.email,
    //             cCode: payload.cCode,
    //             phnNo: payload.phnNo,
    //             otp: Constant.SERVER.BY_PASS_OTP,
    //             cartId: userData.id,
    //             otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
    //             otpVerified: 0,
    //             isGuest: payload.isGuest,
    //             brand: headers.brand,
    //             country: headers.country,
    //             profileStep: 1,
    //         }
    //         if (address && address.id)
    //             userchangePayload['address'] = address
    //         if (checkUser && checkUser.length > 0) {
    //             userchangePayload['id'] = checkUser[0].id
    //             userchangePayload['deleteUserId'] = auth.id
    //             await ENTITY.UserchangeE.buildUserchange(checkUser[0].id, userchangePayload)
    //         } else {
    //             let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
    //             if (cmsUserByEmail && cmsUserByEmail.customerId) {
    //                 if (cmsUserByEmail['phone'] && cmsUserByEmail['phone'] != fullPhnNo)
    //                     return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
    //                 userchangePayload['cmsUserRef'] = parseInt(cmsUserByEmail.customerId)
    //                 userchangePayload['email'] = cmsUserByEmail.email
    //                 userchangePayload['name'] = cmsUserByEmail.firstName + " " + cmsUserByEmail.lastName
    //                 userchangePayload['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
    //                 if (cmsUserByEmail.SdmUserRef && (cmsUserByEmail.SdmUserRef != null || cmsUserByEmail.SdmUserRef != "null") && (cmsUserByEmail.SdmUserRef != "0"))
    //                     userchangePayload['sdmUserRef'] = parseInt(cmsUserByEmail.SdmUserRef)
    //                 if (cmsUserByEmail.SdmCorpRef && (cmsUserByEmail.SdmCorpRef != null || cmsUserByEmail.SdmCorpRef != "null") && (cmsUserByEmail.SdmCorpRef != "0"))
    //                     userchangePayload['sdmCorpRef'] = parseInt(cmsUserByEmail.SdmCorpRef)
    //                 if (cmsUserByEmail.address && cmsUserByEmail.address.length > 0) {
    //                     userData.cmsAddress = cmsUserByEmail.address.slice(0, 6)
    //                 }
    //             } else {
    //                 userchangePayload['sdmUserRef'] = 0
    //                 userchangePayload['sdmCorpRef'] = 0
    //                 userchangePayload['cmsUserRef'] = 0
    //             }
    //             console.log("userchangePayload", userchangePayload)
    //             await ENTITY.UserchangeE.buildUserchange(auth.id, userchangePayload)
    //         }
    //         userData['name'] = payload.name
    //         userData['email'] = payload.email
    //         userData['fullPhnNo'] = payload.cCode + payload.phnNo
    //         userData['phnNo'] = payload.phnNo
    //         userData['cCode'] = payload.cCode
    //         userData['phnVerified'] = 0
    //         userData['profileStep'] = 0
    //         return formatUserData(userData, headers, payload.isGuest)
    //     } catch (error) {
    //         consolelog(process.cwd(), "guestCheckout", JSON.stringify(error), false)
    //         return Promise.reject(error)
    //     }
    // }

    async guestCheckout(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestCheckout, auth: ICommonRequest.AuthorizationObj) {
        try {
            let address
            const fullPhnNo = payload.cCode + payload.phnNo;
            const username = headers.brand + "_" + fullPhnNo;
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "username",
                    value: username
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let asUserByPhone: IUserRequest.IUserData[] = await Aerospike.query(queryArg)

            if (payload.addressId && payload.addressType) {
                let oldAdd: IAddressRequest.IAddress = await ENTITY.AddressE.getAddress({
                    userId: auth.id,
                    bin: (payload.addressType == Constant.DATABASE.TYPE.ADDRESS.DELIVERY) ? Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY : Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP,
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
                name: payload.name,
                email: payload.email,
                cCode: payload.cCode,
                phnNo: payload.phnNo,
                otp: Constant.SERVER.BY_PASS_OTP,
                cartId: userData.id,
                otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                otpVerified: 0,
                isGuest: payload.isGuest,
                brand: headers.brand,
                country: headers.country,
                profileStep: 1,
            }
            if (address && address.id)
                userchangePayload['address'] = address
            consolelog(process.cwd(), "asUserByPhone", asUserByPhone, true)
            if (asUserByPhone && asUserByPhone.length > 0) {
                if (asUserByPhone[0].email != payload.email) {
                    let queryArg: IAerospike.Query = {
                        equal: {
                            bin: "email",
                            value: payload.email
                        },
                        set: ENTITY.UserE.set,
                        background: false,
                    }
                    let asUserByEmail = await Aerospike.query(queryArg)
                    consolelog(process.cwd(), "asUserByEmail", asUserByEmail, true)
                    if (asUserByEmail && asUserByEmail.length > 0) {
                        if (asUserByEmail[0].id != asUserByPhone[0].id)
                            return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_PHONE_ALREADY_EXIST)
                        userchangePayload['cmsUserRef'] = asUserByEmail[0].cmsUserRef
                        userchangePayload['sdmUserRef'] = asUserByEmail[0].sdmUserRef
                        userchangePayload['sdmCorpRef'] = asUserByEmail[0].sdmCorpRef
                    } else {
                        let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                        if (cmsUserByEmail && cmsUserByEmail.customerId) {
                            if (cmsUserByEmail.phone != fullPhnNo)
                                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
                            userchangePayload['cmsUserRef'] = parseInt(cmsUserByEmail['customerId'])
                            userchangePayload['sdmUserRef'] = parseInt(cmsUserByEmail['SdmUserRef'])
                            userchangePayload['sdmCorpRef'] = parseInt(cmsUserByEmail['SdmCorpRef'])
                        } else {
                            let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: userData.email })
                            if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                if (asUserByPhone[0].sdmUserRef && asUserByPhone[0].sdmUserRef != parseInt(sdmUserByEmail.CUST_ID))
                                    return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
                                userchangePayload['sdmUserRef'] = parseInt(sdmUserByEmail.CUST_ID)
                                userchangePayload['sdmCorpRef'] = parseInt(sdmUserByEmail.CUST_CORPID)
                            } else {
                                userchangePayload['sdmUserRef'] = 0
                                userchangePayload['sdmCorpRef'] = 0
                                userchangePayload['cmsUserRef'] = 0
                            }
                        }
                    }
                }
                userchangePayload['id'] = asUserByPhone[0].id
                userchangePayload['deleteUserId'] = auth.id
                await ENTITY.UserchangeE.buildUserchange(asUserByPhone[0].id, userchangePayload)
            } else {
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
                    let cmsUserByPhone: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                    if (cmsUserByPhone && cmsUserByPhone.customerId)
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
                    else {
                        let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email })
                        if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                            userchangePayload['chngPhnSdm'] = 1
                            userchangePayload['sdmUserRef'] = parseInt(sdmUserByEmail.CUST_ID)
                            userchangePayload['sdmCorpRef'] = parseInt(sdmUserByEmail.CUST_CORPID)
                            userchangePayload['cmsUserRef'] = 0
                        } else {
                            userchangePayload['sdmUserRef'] = 0
                            userchangePayload['sdmCorpRef'] = 0
                            userchangePayload['cmsUserRef'] = 0
                        }
                    }
                } else {
                    let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                    if (cmsUserByEmail && cmsUserByEmail.customerId) {
                        if (cmsUserByEmail.phone != fullPhnNo) {
                            let cmsUserByPhone: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                            if (cmsUserByPhone && cmsUserByPhone.customerId)
                                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_PHONE_ALREADY_EXIST)
                            else {
                                userchangePayload['chngPhnCms'] = 1
                                userchangePayload['chngPhnSdm'] = 1
                            }
                        }
                        userchangePayload['cmsUserRef'] = parseInt(cmsUserByEmail['customerId'])
                        userchangePayload['sdmUserRef'] = parseInt(cmsUserByEmail['SdmUserRef'])
                        userchangePayload['sdmCorpRef'] = parseInt(cmsUserByEmail['SdmCorpRef'])
                    } else {
                        let cmsUserByPhone: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                        if (cmsUserByPhone && cmsUserByPhone.customerId) {
                            if (cmsUserByPhone.email != payload.email) {
                                let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email })
                                if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                    if (cmsUserByPhone.SdmUserRef != sdmUserByEmail.CUST_ID) {
                                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
                                    } else {
                                        userchangePayload['chngPhnCms'] = 1
                                        userchangePayload['chngPhnSdm'] = 1
                                    }
                                }
                                else {
                                    userchangePayload['chngEmailCms'] = 1
                                    userchangePayload['chngEmailSdm'] = 1
                                }
                            }
                            userchangePayload['cmsUserRef'] = parseInt(cmsUserByPhone['customerId'])
                            userchangePayload['sdmUserRef'] = parseInt(cmsUserByPhone['SdmUserRef'])
                            userchangePayload['sdmCorpRef'] = parseInt(cmsUserByPhone['SdmCorpRef'])
                        } else {
                            let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email })
                            if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                userchangePayload['chngPhnSdm'] = 1
                                userchangePayload['sdmUserRef'] = parseInt(sdmUserByEmail.CUST_ID)
                                userchangePayload['sdmCorpRef'] = parseInt(sdmUserByEmail.CUST_CORPID)
                                userchangePayload['cmsUserRef'] = 0
                            } else {
                                userchangePayload['sdmUserRef'] = 0
                                userchangePayload['sdmCorpRef'] = 0
                                userchangePayload['cmsUserRef'] = 0
                            }
                        }
                    }
                }
                console.log("userchangePayload", userchangePayload)
                await ENTITY.UserchangeE.buildUserchange(auth.id, userchangePayload)
            }

            userData['name'] = payload.name
            userData['email'] = payload.email
            userData['fullPhnNo'] = payload.cCode + payload.phnNo
            userData['phnNo'] = payload.phnNo
            userData['cCode'] = payload.cCode
            userData['phnVerified'] = 0
            userData['profileStep'] = 0
            return formatUserData(userData, headers, payload.isGuest)
        } catch (error) {
            consolelog(process.cwd(), "guestCheckout", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const guestController = new GuestController();