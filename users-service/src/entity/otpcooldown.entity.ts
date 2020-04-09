'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import * as CMS from "../cms";
import * as SDM from '../sdm';
import { Aerospike } from '../aerospike'

export class OtpcooldownEntity extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.OTPCOOLDOWN)
    }

    public otpcooldownSchema = Joi.object().keys({
        count: Joi.number(),
    });

    /**
     * @description Get single otpcooldown
     * @param userId 
     */
    async getOtpcooldown(userId: string) {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: userId
            }
            let otpcooldown = await Aerospike.get(getArg)
            return otpcooldown
        } catch (error) {
            consolelog(process.cwd(), "getOtpcooldown", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Check otpcooldown
     */
    public async checkOtpcooldown(userId: string) {
        try {
            let count = Constant.CONF.GENERAL.MAX_OTP_RETRY - 1
            let getOtpcooldown = await this.getOtpcooldown(userId)
            if (getOtpcooldown && getOtpcooldown.count == 0) {
                return false
            } else {
                count = !isNaN(getOtpcooldown.count) ? getOtpcooldown.count - 1 : count
                let putArg: IAerospike.Put = {
                    bins: { count: count },
                    set: this.set,
                    key: userId,
                    ttl: Constant.CONF.GENERAL.OTP_COOLDOWN,
                    createOrReplace: true
                }
                await Aerospike.put(putArg)
                return true
            }

        } catch (error) {
            consolelog(process.cwd(), "checkOtpcooldown", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

}

export const OtpcooldownE = new OtpcooldownEntity()
