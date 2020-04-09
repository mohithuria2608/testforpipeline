'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog, nameConstructor, cryptData, deCryptData } from '../utils'

export class AddressCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createAddresssOnCms(payload: IUserRequest.IUserData, asAddress: IAddressRequest.IAddress[], ): Promise<any> {
        try {
            let naemRes = nameConstructor(payload.name.trim())
            let address = []
            if (asAddress && typeof asAddress == 'string')
                asAddress = JSON.parse(asAddress)
            if (asAddress && asAddress.length > 0) {
                asAddress.map(obj => {
                    address.push({
                        "id": obj.id,
                        "firstName": naemRes.firstName,
                        "lastName": naemRes.lastName,
                        "password": payload.password,
                        "countryId": "AE",// Constant.DATABASE.COUNTRY.UAE, // donot change
                        "zip": "00000",
                        "city": obj.description,
                        "state": obj.description,
                        "street": obj.description,
                        "latitude": obj.lat,
                        "longitude": obj.lng,
                        "description": obj.description,
                        "address_is": 1,
                        "addressType": obj.addressType,
                        "telephone": payload.fullPhnNo,
                        "bldgName": obj.bldgName,
                        "flatNum": obj.bldgName,
                        "addTag": obj.tag,
                        "sdmAddressRef": obj.sdmAddressRef,
                        "sdmStoreRef": obj.storeId,
                        "sdmCountryRef": obj.countryId,
                        "sdmAreaRef": obj.areaId,
                        "sdmCityRef": obj.cityId,
                    })
                })
                let formObj: IAddressCMSRequest.ICreateAddress = {
                    "customerId": payload.cmsUserRef,
                    "websiteId": 1,
                    "address": address
                }
                const headers = {};
                const form = formObj;
                const options = {
                    method: Constant.DATABASE.CMS.END_POINTS.CREATE_ADDRESS.METHOD,
                    url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.CREATE_ADDRESS.URL,
                    body: true
                }
                let cmsRes = await this.request(options, headers, form)
                if (cmsRes && cmsRes.length > 0) {
                    if (cmsRes[0]['success'] && cmsRes[0]['success'] != 'false')
                        return cmsRes[0]
                    else
                        return Promise.reject(cmsRes[0]['error_message'])
                } else
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
            } else {
                return {}
            }
        } catch (error) {
            consolelog(process.cwd(), 'createAddresssOnCms', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateAddresssOnCms(userData: IUserRequest.IUserData, headers: ICommonRequest.IHeaders, asAddress: IAddressRequest.IAddress[]): Promise<any> {
        try {
            let naemRes = nameConstructor(userData.name.trim())
            let formObj: IAddressCMSRequest.IUpdateAddress = {
                "customerId": userData.cmsUserRef.toString(),
                "addressId": asAddress[0].cmsAddressRef.toString(),
                "websiteId": "1",
                "firstName": naemRes.firstName,
                "lastName": naemRes.lastName,
                "password": deCryptData(userData.password),
                "countryId": "AE", // donot change
                "zip": "00000",
                "city": asAddress[0].description,
                "state": asAddress[0].description,
                "street": asAddress[0].description,
                "latitude": asAddress[0].lat.toString(),
                "longitude": asAddress[0].lng.toString(),
                "description": asAddress[0].description,
                "addressIs": '1',
                "addressType": asAddress[0].addressType,
                "telephone": userData.fullPhnNo,
                "bldgName": asAddress[0].bldgName,
                "flatNum": asAddress[0].flatNum,
                "addTag": asAddress[0].tag,
                "sdmAddressRef": asAddress[0].sdmAddressRef.toString(),
                "sdmStoreRef": asAddress[0].storeId.toString(),
                "sdmCountryRef": asAddress[0].countryId.toString(),
                "sdmAreaRef": asAddress[0].areaId.toString(),
                "sdmCityRef": asAddress[0].cityId.toString()
            }
            const headers = {};
            const form = formObj;
            const options = {
                method: Constant.DATABASE.CMS.END_POINTS.UPDATE_ADDRESS.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.UPDATE_ADDRESS.URL,
                body: true
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0]['success'] && cmsRes[0]['success'] != 'false')
                    return cmsRes[0]
                else
                    return Promise.reject(cmsRes[0]['error_message'])
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'updateAddresssOnCms', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async deleteAddresssOnCms(payload: IAddressCMSRequest.IDeleteAddress): Promise<any> {
        try {
            let formObj: IAddressCMSRequest.IDeleteAddressReq = {
                "customerId": payload.cmsUserRef.toString(),
                "addressId": payload.cmsAddressRef.toString(),
                "websiteId": "1"
            }
            const headers = {};
            const form = formObj;
            const options = {
                method: Constant.DATABASE.CMS.END_POINTS.DELETE_ADDRESS.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.DELETE_ADDRESS.URL,
                body: true
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0]['success'] && cmsRes[0]['success'] != 'false')
                    return cmsRes[0]
                else
                    return Promise.reject(cmsRes[0]['error_message'])
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'updateAddresssOnCms', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const AddressCMSE = new AddressCMSEntity()
