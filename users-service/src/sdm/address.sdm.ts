'use strict';
import { BaseSDM } from './base.sdm'
import { consolelog } from '../utils'
import * as  _ from 'lodash';

export class AddressSDMEntity extends BaseSDM {

    constructor() {
        super()
    }

    /**
    * @method SDK
    * */
    async createAddress(payload: IAddressSDMRequest.ICreateAddress) {
        try {
            let data = {
                name: "RegisterAddressByID",
                req: payload
            }
            let res = await this.requestData(data.name, data.req)
            if (res && res.SDKResult && (res.SDKResult.ResultCode == "Success"))
                return res.RegisterAddressByIDResult
            else 
                return Promise.reject(res)
        } catch (error) {
            consolelog(process.cwd(), 'createAddress', error, false)
            return (error)
        }
    }
}

export const AddressSDME = new AddressSDMEntity()
