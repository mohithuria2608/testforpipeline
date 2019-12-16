'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class UserCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    /**
    * @method GRPC
    * @param {string} id : user id
    * */
    async getById(payload: IUserRequest.IId) {
        try {

        } catch (error) {
            consolelog(process.cwd(), "getById", error, false)
            return Promise.reject(error)
        }
    }

}

export const UserCMSE = new UserCMSEntity()
