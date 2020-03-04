'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog, nameConstructor } from '../utils'

export class AddressCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createAddresssOnCms(payload: IUserRequest.IUserData): Promise<any> {
        try {
            let naemRes = nameConstructor(payload.name)
            let address = []
            if (payload.asAddress && typeof payload.asAddress == 'string')
                payload.asAddress = JSON.parse(payload.asAddress)
            if (payload.asAddress && payload.asAddress.length > 0) {
                payload.asAddress.map(obj => {
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
                    if (cmsRes[0]['success'])
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

    async updateAddresssOnCms(payload: IUserRequest.IUserData): Promise<any> {
        try {
            let naemRes = nameConstructor(payload.name)
            let formObj: IAddressCMSRequest.IUpdateAddress = {
                "customerId": payload.cmsUserRef.toString(),
                "addressId": payload.asAddress[0].cmsAddressRef.toString(),
                "websiteId": "1",
                "firstName": naemRes.firstName,
                "lastName": naemRes.lastName,
                "password": payload.password,
                "countryId": "AE", // donot change
                "zip": "00000",
                "city": payload.asAddress[0].description,
                "state": payload.asAddress[0].description,
                "street": payload.asAddress[0].description,
                "latitude": payload.asAddress[0].lat.toString(),
                "longitude": payload.asAddress[0].lng.toString(),
                "description": payload.asAddress[0].description,
                "addressIs": '1',
                "addressType": payload.asAddress[0].addressType,
                "telephone": payload.fullPhnNo,
                "bldgName": payload.asAddress[0].bldgName,
                "flatNum": payload.asAddress[0].bldgName,
                "addTag": payload.asAddress[0].tag,
                "sdmAddressRef": payload.asAddress[0].sdmAddressRef.toString(),
                "sdmStoreRef": payload.asAddress[0].storeId.toString(),
                "sdmCountryRef": payload.asAddress[0].countryId.toString(),
                "sdmAreaRef": payload.asAddress[0].areaId.toString(),
                "sdmCityRef": payload.asAddress[0].cityId.toString()
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
                if (cmsRes[0]['success'])
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
                if (cmsRes[0]['success'])
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
