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
            let tempUser: IUserRequest.IUserData = {
                id: ENTITY.UserE.ObjectId().toString(),
                profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.INIT,
                brand: headers.brand,
                country: headers.country,
                cartId: ENTITY.UserE.ObjectId().toString(),
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
            let queryArg: IAerospike.Query = {
                equal: {
                    bin: "username",
                    value: username
                },
                set: ENTITY.UserE.set,
                background: false,
            }
            let checkUser: IUserRequest.IUserData[] = await Aerospike.query(queryArg)

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

            let userchangePayload = {
                username: username,
                fullPhnNo: fullPhnNo,
                name: payload.name,
                email: payload.email,
                cCode: payload.cCode,
                phnNo: payload.phnNo,
                otp: Constant.SERVER.BY_PASS_OTP,
                cartId: userData.cartId,
                otpExpAt: new Date().getTime() + Constant.SERVER.OTP_EXPIRE_TIME,
                otpVerified: 0,
                isGuest: payload.isGuest,
                brand: headers.brand,
                country: headers.country,
                profileStep: 1,

            }
            if (address && address.id)
                userchangePayload['address'] = address
            if (checkUser && checkUser.length > 0) {
                userchangePayload['id'] = checkUser[0].id
                userchangePayload['deleteUserId'] = auth.id
                await ENTITY.UserchangeE.buildUserchange(checkUser[0].id, userchangePayload)
            } else {
                let cmsUserByPhoneNo: IUserCMSRequest.ICmsUser = await CMS.UserCMSE.getCustomerFromCms({ fullPhnNo: fullPhnNo })
                if (cmsUserByPhoneNo && cmsUserByPhoneNo.customer_id) {
                    userchangePayload['cmsUserRef'] = parseInt(cmsUserByPhoneNo.customer_id)
                    userchangePayload['email'] = cmsUserByPhoneNo.email
                    userchangePayload['name'] = cmsUserByPhoneNo.firstName + " " + cmsUserByPhoneNo.lastName
                    userchangePayload['profileStep'] = Constant.DATABASE.TYPE.PROFILE_STEP.FIRST
                    if (cmsUserByPhoneNo.SdmCorpRef)
                        userchangePayload['sdmUserRef'] = parseInt(cmsUserByPhoneNo.SdmUserRef)
                    if (cmsUserByPhoneNo.SdmCorpRef)
                        userchangePayload['sdmCorpRef'] = parseInt(cmsUserByPhoneNo.SdmCorpRef)
                    if (cmsUserByPhoneNo.address && cmsUserByPhoneNo.address.length > 0) {
                        /**
                         * @todo : sync cms address on as
                         */
                    }
                } else {
                    userchangePayload['sdmUserRef'] = 0
                    userchangePayload['sdmCorpRef'] = 0
                    userchangePayload['cmsUserRef'] = 0
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