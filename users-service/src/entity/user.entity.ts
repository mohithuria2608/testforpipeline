'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { authService } from '../grpc/client'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'
import { add } from 'winston';

export class UserEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    protected set: SetNames;
    constructor() {
        super('user')
    }

    /**
    * @method GRPC
    * @param {string} id : user id
    * */
    async getById(payload: IUserServiceRequest.IId) {
        try {
            consolelog("getById", payload.id, true)
            let getArg: IAerospike.Get = {
                set: 'user',
                key: payload.id
            }
            let user: IUserRequest.IUserData = await Aerospike.get(getArg)
            if (user && user.id) {
                return user
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E404.USER_NOT_FOUND)
        } catch (error) {
            consolelog("getById", error, false)
            return Promise.reject(error)
        }
    }

    private buildUser(userInfo: IUserRequest.IUserUpdate, isCreate: boolean) {
        const id = this.uuidv1();
        const user = isCreate ? {
            id: id,
            name: "",
            cCode: "",
            phnNo: "",
            phnVerified: 0,
            email: "",
            emailVerified: 0,
            profileStep: 0,
            socialKey: "",
            medium: "",
            createdAt: 0,
            address: {},
            session: {},
            removeUserId: ""
        } : {}
        if (userInfo.name != undefined)
            user['name'] = userInfo.name
        if (userInfo.cCode != undefined)
            user['cCode'] = userInfo.cCode
        if (userInfo.phnNo != undefined)
            user['phnNo'] = userInfo.phnNo
        if (userInfo.phnVerified != undefined)
            user['phnVerified'] = userInfo.phnVerified
        if (userInfo.email != undefined)
            user['email'] = userInfo.email
        if (userInfo.emailVerified != undefined)
            user['emailVerified'] = userInfo.emailVerified
        if (userInfo.profileStep != undefined)
            user['profileStep'] = userInfo.profileStep
        if (userInfo.socialKey != undefined)
            user['socialKey'] = userInfo.socialKey
        if (userInfo.medium != undefined)
            user['medium'] = userInfo.medium
        if (userInfo.createdAt != undefined)
            user['createdAt'] = userInfo.createdAt
        else
            user['createdAt'] = new Date().getTime()
        if (userInfo.removeUserId != undefined)
            user['removeUserId'] = userInfo.removeUserId
        return user
    }

    public buildSession(headers: ICommonRequest.IHeaders, sessionInfo: IUserRequest.ISessionUpdate, isCreate: boolean) {
        let session = isCreate ? {
            otp: 0,
            otpExpAt: 0,
            otpVerified: 0,
            isLogin: 0,
            deviceid: headers.deviceid,
            language: headers.language,
            country: headers.country,
            appversion: headers.appversion,
            devicemodel: headers.devicemodel,
            devicetype: headers.devicetype,
            osversion: headers.osversion,
            createdAt: new Date().getTime(),
            cartId: ""
        } : {}
        if (sessionInfo.otp != undefined)
            session['otp'] = sessionInfo.otp
        if (sessionInfo.otpExpAt != undefined)
            session['otpExpAt'] = sessionInfo.otpExpAt
        if (sessionInfo.otpVerified != undefined)
            session['otpVerified'] = sessionInfo.otpVerified
        if (sessionInfo.isLogin != undefined)
            session['isLogin'] = sessionInfo.isLogin
        if (sessionInfo.createdAt != undefined)
            session['createdAt'] = sessionInfo.createdAt

        if (headers.deviceid != undefined)
            session['deviceid'] = headers.deviceid
        if (headers.language != undefined)
            session['language'] = headers.language
        if (headers.country != undefined)
            session['country'] = headers.country
        if (headers.appversion != undefined)
            session['appversion'] = headers.appversion
        if (headers.devicemodel != undefined)
            session['devicemodel'] = headers.devicemodel
        if (headers.devicetype != undefined)
            session['devicetype'] = headers.devicetype
        if (headers.osversion != undefined)
            session['osversion'] = headers.osversion
        return session
    }

    async createUser(
        headers: ICommonRequest.IHeaders,
        userInfo: IUserRequest.IUserUpdate,
        sessionCreate: IUserRequest.ISessionUpdate,
    ): Promise<IUserRequest.IUserData> {
        try {
            let dataToSave = {
                ...this.buildUser(userInfo, true)
            }
            dataToSave['session'][headers.deviceid] = { ...this.buildSession(headers, sessionCreate, true) }
            let putArg: IAerospike.Put = {
                bins: dataToSave,
                set: this.set,
                key: dataToSave.id,
                ttl: Constant.SERVER.INITIAL_USER_TTL,
                create: true,
            }
            await Aerospike.put(putArg)
            let user = await this.getById({ id: dataToSave.id })
            return user
        } catch (err) {
            consolelog("createUser", err, false)
            return Promise.reject(err)
        }
    }

    async createSession(
        headers: ICommonRequest.IHeaders,
        userData: IUserRequest.IUserData,
        userUpdate: IUserRequest.IUserUpdate,
        sessionUpdate: IUserRequest.ISessionUpdate,
    ): Promise<IUserRequest.IUserData> {
        try {
            let dataToUpdate = {
                ...this.buildUser(userUpdate, false),
                session: {}
            }
            if (userData.session && userData.session.hasOwnProperty(headers.deviceid)) {
                const Context = Aerospike.cdt.Context
                const context = new Context().addMapKey(headers.deviceid)
                let op = [
                    Aerospike.maps.putItems('session', { ...this.buildSession(headers, sessionUpdate, false) }, {
                        writeFlags: Aerospike.maps.writeFlags.UPDATE_ONLY | Aerospike.maps.writeFlags.NO_FAIL | Aerospike.maps.writeFlags.PARTIAL
                    }).withContext(context)
                ]
                await Aerospike.operationsOnMap({ set: this.set, key: userData.id }, op)
                delete dataToUpdate['session']
            } else {
                dataToUpdate['session'][headers.deviceid] = { ...this.buildSession(headers, sessionUpdate, true) }
            }

            let putArg: IAerospike.Put = {
                bins: dataToUpdate,
                set: this.set,
                key: userData.id,
                update: true,
            }
            await Aerospike.put(putArg)
            let user = await this.getById({ id: userData.id })
            return user
        } catch (err) {
            consolelog("createSession", err, false)
            return Promise.reject(err)
        }
    }

    private buildAddress(addressInfo: IAddressRequest.IRegisterAddress) {
        let address = {
            createdBy: 'App',
            updatedBy: 'App'
        };
        if (addressInfo.addressId == undefined) {
            let id = this.uuidv1();
            address['id'] = id
        }
        if (addressInfo.areaId != undefined)
            address['areaId'] = addressInfo.areaId
        if (addressInfo.bldgName != undefined)
            address['bldgName'] = addressInfo.bldgName
        if (addressInfo.bldgNameUn != undefined)
            address['bldgNameUn'] = addressInfo.bldgNameUn
        if (addressInfo.bldgNum != undefined)
            address['bldgNum'] = addressInfo.bldgNum
        if (addressInfo.cityId != undefined)
            address['cityId'] = addressInfo.cityId
        if (addressInfo.classId != undefined)
            address['classId'] = addressInfo.classId
        if (addressInfo.countryId != undefined)
            address['countryId'] = addressInfo.countryId
        if (addressInfo.userId != undefined)
            address['userId'] = addressInfo.userId
        if (addressInfo.description != undefined)
            address['description'] = addressInfo.description
        if (addressInfo.districtId != undefined)
            address['districtId'] = addressInfo.districtId
        if (addressInfo.flatNum != undefined)
            address['flatNum'] = addressInfo.flatNum
        if (addressInfo.floor != undefined)
            address['floor'] = addressInfo.floor
        if (addressInfo.language != undefined)
            address['language'] = addressInfo.language
        if (addressInfo.phoneAreaCode != undefined)
            address['phoneAreaCode'] = addressInfo.phoneAreaCode
        if (addressInfo.phoneLookup != undefined)
            address['phoneLookup'] = addressInfo.phoneLookup
        if (addressInfo.phoneNumber != undefined)
            address['phoneNumber'] = addressInfo.phoneNumber
        if (addressInfo.phoneType != undefined)
            address['phoneType'] = addressInfo.phoneType
        if (addressInfo.postalCode != undefined)
            address['postalCode'] = addressInfo.postalCode
        if (addressInfo.provinceCode != undefined)
            address['provinceCode'] = addressInfo.provinceCode
        if (addressInfo.sketch != undefined)
            address['sketch'] = addressInfo.sketch
        if (addressInfo.streetId != undefined)
            address['streetId'] = addressInfo.streetId
        if (addressInfo.useMap != undefined)
            address['useMap'] = addressInfo.useMap
        return address
    }

    async addAddress(
        userData: IUserRequest.IUserData,
        addressData: IAddressRequest.IRegisterAddress,
    ): Promise<IUserRequest.IUserData> {
        try {
            let address = { ...this.buildAddress(addressData) }
            // const Context = Aerospike.cdt.Context
            // const context = new Context().addMapKey(address.id)
            let data = {}
            data[address['id']] = address
            let op = [
                Aerospike.maps.putItems('address', data, {
                    writeFlags: Aerospike.maps.writeFlags.CREATE_ONLY | Aerospike.maps.writeFlags.NO_FAIL | Aerospike.maps.writeFlags.PARTIAL
                })
            ]
            await Aerospike.operationsOnMap({ set: this.set, key: userData.id }, op)
            let user = await this.getById({ id: userData.id })
            return user
        } catch (err) {
            consolelog("addAddress", err, false)
            return Promise.reject(err)
        }
    }

    async updateAddress(
        userData: IUserRequest.IUserData,
        addressUpdate: IAddressRequest.IRegisterAddress,
    ): Promise<IUserRequest.IUserData> {
        try {
            const Context = Aerospike.cdt.Context
            const context = new Context().addMapKey(addressUpdate.addressId)
            let op = [
                Aerospike.maps.putItems('address', { ...this.buildAddress(addressUpdate) }, {
                    writeFlags: Aerospike.maps.writeFlags.UPDATE_ONLY | Aerospike.maps.writeFlags.NO_FAIL | Aerospike.maps.writeFlags.PARTIAL
                }).withContext(context)
            ]
            await Aerospike.operationsOnMap({ set: this.set, key: userData.id }, op)
            let user = await this.getById({ id: userData.id })
            return user
        } catch (err) {
            consolelog("updateAddress", err, false)
            return Promise.reject(err)
        }
    }

    async getTokens(deviceid: string, devicetype: string, tokentype: string[], id?: string) {
        try {
            if (tokentype && tokentype.length > 0) {
                let promise = []
                tokentype.map(elem => {
                    let dataToSend = {
                        deviceid: deviceid,
                        devicetype: devicetype,
                        tokenType: elem
                    }
                    if (id)
                        dataToSend['id'] = id
                    return promise.push(authService.createToken(dataToSend))
                })
                let tokens: IAuthServiceRequest.IToken[] = await Promise.all(promise)

                let res = {
                    accessToken: undefined,
                    refreshToken: undefined
                }
                tokentype.map((elem, i) => {
                    if (elem == Constant.DATABASE.TYPE.TOKEN.GUEST_AUTH || elem == Constant.DATABASE.TYPE.TOKEN.USER_AUTH) {
                        res['accessToken'] = tokens[i].token
                    } else if (elem == Constant.DATABASE.TYPE.TOKEN.REFRESH_AUTH) {
                        res['refreshToken'] = tokens[i].token
                    }
                    return
                })
                return res
            } else {
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.INVALID_TOKEN_TYPE)
            }
        } catch (err) {
            consolelog("getTokens", err, false)
            return Promise.reject(err)
        }
    }
}

export const UserE = new UserEntity()
