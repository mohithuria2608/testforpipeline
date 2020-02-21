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
                    "country_id": "AE",// Constant.DATABASE.COUNTRY.UAE,
                    "zip": "00000",
                    "city": obj.description,
                    "state": obj.description,
                    "street": obj.description,
                    "latitude": obj.lat,
                    "longitude": obj.lng,
                    "description": obj.description,
                    "address_is": 1,
                    "address_type": obj.addressType,
                    "telephone": payload.fullPhnNo
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

}

export const AddressCMSE = new AddressCMSEntity()
