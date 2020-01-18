'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog, cryptData } from '../utils'
import * as CMS from "../cms";
import * as SDM from '../sdm';
import { Aerospike } from '../aerospike'


export class SessionEntity extends BaseEntity {
    private uuidv1 = require('uuid/v1');
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'phnNo',
            index: 'idx_' + this.set + '_' + 'phnNo',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'email',
            index: 'idx_' + this.set + '_' + 'email',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'socialKey',
            index: 'idx_' + this.set + '_' + 'socialKey',
            type: "STRING"
        },
        {
            set: this.set,
            bin: 'cmsUserRef',
            index: 'idx_' + this.set + '_' + 'cmsUserRef',
            type: "NUMERIC"
        },
        {
            set: this.set,
            bin: 'sdmUserRef',
            index: 'idx_' + this.set + '_' + 'sdmUserRef',
            type: "NUMERIC"
        }
    ]

    constructor() {
        super('session')
    }

    public sessionSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        brand: Joi.string().valid(Constant.DATABASE.BRAND.KFC, Constant.DATABASE.BRAND.PH),
        language: Joi.string().valid(Constant.DATABASE.LANGUAGE.AR, Constant.DATABASE.LANGUAGE.EN).trim().required(),
        country: Joi.string().valid(Constant.DATABASE.COUNTRY.UAE).trim().required(),
        appversion: Joi.string().trim().required(),
        devicemodel: Joi.string().trim().required(),
        devicetype: Joi.string().valid(Constant.DATABASE.TYPE.DEVICE.ANDROID, Constant.DATABASE.TYPE.DEVICE.IOS).trim().required(),
        osversion: Joi.string().trim().required(),
        deviceid: Joi.string().trim().required(),
        isLogin: Joi.number().required(),
        isGuest: Joi.number().valid(0, 1).required(),
        createdAt: Joi.number().required(),
        updatedAt: Joi.number().required(),
    });

}

export const SessionE = new SessionEntity()
