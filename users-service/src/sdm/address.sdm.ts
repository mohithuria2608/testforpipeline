'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseSDM } from './base.sdm'
import { consolelog } from '../utils'
import * as  _ from 'lodash';

export class UserSDMEntity extends BaseSDM {

    constructor() {
        super()
    }

    /**
    * @method SDK
    * */
    async createAddress(payload: IUserRequest.IUserData) {
        try {
            let data: IAddressSDMRequest.ICreateAddressReq = {
                name: "RegisterAddressByID",
                req: {
                    customerRegistrationID: "",
                    address: {}
                }
            }
            let res = await this.requestData(data.name, data.req)
            return res
        } catch (error) {
            consolelog(process.cwd(), 'createAddress', JSON.stringify(error), false)
            return (error)
        }
    }
}

export const UserSDME = new UserSDMEntity()
