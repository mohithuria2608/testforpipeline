import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { consolelog } from '../utils'

export class BaseEntity {
    protected set: SetNames;
    constructor(set?) {
        this.set = set
    }

    public storeSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        storeId: Joi.number().required().description("sk NUMERIC"),
        menuId: Joi.number().required().description("sk NUMERIC"),
        name_en: Joi.string().trim().required(),
        name_ar: Joi.string().trim().required(),
        phone1: Joi.string().trim().required(),
        phone2: Joi.string().trim().required(),
        services: Joi.object().keys({
            din: Joi.number(),
            del: Joi.number(),
            tak: Joi.number(),
        }),
        active: Joi.number().required(),
        geoData: Joi.object().keys({
            address_en: Joi.string(),
            address_ar: Joi.string(),
            coords: Joi.string(),
        }),
        startTime: Joi.any(),
        endTime: Joi.any(),
        geoFence: Joi.array().items(Joi.array().items(Joi.array())).description('geo spatial index')
    });

    public pickupSchema = Joi.object().keys({
        id: Joi.string().trim().required().description("pk"),
        cityId: Joi.number().required().description("sk NUMERIC"),
        countryId: Joi.number().required().description("sk NUMERIC"),
        name_en: Joi.string().required(),
        name_ar: Joi.string().required(),
        area: Joi.array().items(
            Joi.object().keys({
                id: Joi.string().required(),
                cityId: Joi.number().required(),
                districtId: Joi.number().required(),
                streetId: Joi.number().required(),
                areaId: Joi.number().required(),
                provinceId: Joi.number().required(),
                countryId: Joi.number().required(),
                name_en: Joi.string().required(),
                name_ar: Joi.string().required(),
                storeId: Joi.number().required(),
                store: this.storeSchema
            }))
    });




}