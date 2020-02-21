'use strict';
import * as config from "config"
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class AddressCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createAddresssOnCms(payload: IUserRequest.IUserData): Promise<any> {
        try {
            let address = []
            payload.asAddress.map(obj => {
                address.push({
                    "id": obj.id,
                    "firstname": payload.name,
                    "lastname": payload.name,
                    "password": payload.password,
                    "country_id": "AE",// Constant.DATABASE.COUNTRY.UAE, // donot change
                    "zip": "00000",
                    "city": obj.description,
                    "state": obj.description,
                    "street": obj.description,
                    "latitude": obj.lat,
                    "longitude": obj.lng,
                    "description": obj.description,
                    "address_is": 1,
                    "address_type": obj.addressType,
                    "telephone": payload.fullPhnNo,
                    "bldg_name": obj.bldgName,
                    "flat_num": obj.bldgName,
                    "add_tag": obj.tag,
                    "sdm_address_ref": obj.sdmAddressRef,
                    "sdm_store_ref": obj.storeId,
                    "sdm_country_ref": obj.countryId,
                    "sdm_area_ref": obj.areaId,
                    "sdm_city_ref": obj.cityId,
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
            consolelog(process.cwd(), 'createAddresssOnCms', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateAddresssOnCms(payload: IUserRequest.IUserData): Promise<any> {
        try {
            let formObj: IAddressCMSRequest.IUpdateAddress = {
                "customerId": payload.cmsUserRef.toString(),
                "addressId": payload.asAddress[0].cmsAddressRef.toString(),
                "websiteId": "1",
                "firstname": payload.name,
                "lastname": payload.name,
                "password": payload.password,
                "country_id": "AE", // donot change
                "zip": "00000",
                "city": payload.asAddress[0].description,
                "state": payload.asAddress[0].description,
                "street": payload.asAddress[0].description,
                "latitude": payload.asAddress[0].lat.toString(),
                "longitude": payload.asAddress[0].lng.toString(),
                "description": payload.asAddress[0].description,
                "address_is": '1',
                "address_type": payload.asAddress[0].addressType,
                "telephone": payload.fullPhnNo,
                "bldg_name": payload.asAddress[0].bldgName,
                "flat_num": payload.asAddress[0].bldgName,
                "add_tag": payload.asAddress[0].tag,
                "sdm_address_ref": payload.asAddress[0].sdmAddressRef.toString(),
                "sdm_store_ref": payload.asAddress[0].storeId.toString(),
                "sdm_country_ref": payload.asAddress[0].countryId.toString(),
                "sdm_area_ref": payload.asAddress[0].areaId.toString(),
                "sdm_city_ref": payload.asAddress[0].cityId.toString()
            }
            const headers = {};
            const form = formObj;
            const options = {
                method: Constant.DATABASE.CMS.END_POINTS.UPDATE_ADDRESS.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.UPDATE_ADDRESS.URL,
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
