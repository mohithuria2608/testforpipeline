'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
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
            if (res && res.RegisterAddressByIDResult && res.RegisterAddressByIDResult.ADDR_ID)
                return res.RegisterAddressByIDResult
            else {
                return {}
            }
        } catch (error) {
            consolelog(process.cwd(), 'createAddress', error, false)
            return (error)
        }
    }
}

export const AddressSDME = new AddressSDMEntity()
