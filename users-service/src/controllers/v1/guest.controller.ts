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
    async guestCheckout(headers: ICommonRequest.IHeaders, payload: IGuestRequest.IGuestCheckout, auth: ICommonRequest.AuthorizationObj) {
        try {
            let address
            const fullPhnNo = payload.cCode + payload.phnNo;
            const username = headers.brand + "_" + fullPhnNo;
            let userData: IUserRequest.IUserData = await ENTITY.UserE.getUser({ userId: auth.id })
            if (userData.sdmUserRef) {
                let userId = ENTITY.UserE.ObjectId().toString()
                let tempUser: IUserRequest.IUserData = {
                    id: userId,
                    profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                    brand: headers.brand,
                    country: headers.country,
                    cartId: userId,
                    phnVerified: 0,
                }
                userData = await ENTITY.UserE.buildUser(tempUser)
                auth.id = userData.id
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
            if (asUserByPhone && asUserByPhone.length > 0) {
                console.log('STEP : 1               MS : P')
                if (asUserByPhone[0].email == payload.email) {
                    console.log('STEP : 2               MS : P/E  , same user')
                    userchangePayload['id'] = asUserByPhone[0].id
                    userchangePayload['deleteUserId'] = ""
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
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_PHONE_ALREADY_EXIST)
                    } else {
                        console.log('STEP : 5               MS : P')
                        userchangePayload['id'] = asUserByPhone[0].id
                        let cmsUserByEmail: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ email: payload.email })
                        if (cmsUserByEmail && cmsUserByEmail.customerId) {
                            console.log('STEP : 6               MS : P, CMS : E  different user')
                            return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
                        } else {
                            console.log('STEP : 7               MS : P, CMS :, ')
                            userchangePayload['chngEmailCms'] = 1
                            let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: userData.email })
                            if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                console.log('STEP : 8               MS : P, CMS :, SDM : E    different user')
                                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
                            } else {
                                console.log('STEP : 9               MS : P, CMS :, SDM :    update email')
                                userchangePayload['chngEmailSdm'] = 1
                                userchangePayload['chngEmailCms'] = 1
                            }
                        }
                    }
                }
                await ENTITY.UserchangeE.buildUserchange(asUserByPhone[0].id, userchangePayload)
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
                    userchangePayload['deleteUserId'] = ""
                    console.log('STEP : 11               MS : E')
                    let cmsUserByPhone: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                    if (cmsUserByPhone && cmsUserByPhone.customerId) {
                        console.log('STEP : 12               MS : E , CMS : P   different user')
                        return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
                    }
                    else {
                        console.log('STEP : 13               MS : E , CMS ')
                        userchangePayload['id'] = asUserByEmail[0].id
                        userchangePayload['deleteUserId'] = ""
                        userchangePayload['chngPhnSdm'] = 1
                        userchangePayload['chngPhnCms'] = 1
                    }
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
                                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_PHONE_ALREADY_EXIST)
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
                            let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email })
                            if (sdmUserByEmail && sdmUserByEmail.CUST_ID) {
                                console.log('STEP : 21               MS :  , CMS : P , SDM : E  different user')
                                return Promise.reject(Constant.STATUS_MSG.ERROR.E400.USER_EMAIL_ALREADY_EXIST)
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
                            let sdmUserByEmail = await SDM.UserSDME.getCustomerByEmail({ email: payload.email })
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