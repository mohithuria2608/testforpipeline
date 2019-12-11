import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

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
        address_en: Joi.string(),
        address_ar: Joi.string(),
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

    chunk(array, size) {
        const chunked_arr = [];
        for (let i = 0; i < array.length; i++) {
            const last = chunked_arr[chunked_arr.length - 1];
            if (!last || last.length === size) {
                chunked_arr.push([array[i]]);
            } else {
                last.push(array[i]);
            }
        }
        return chunked_arr;
    }

    async post(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog("post", error, false)
            return Promise.reject(error)
        }
    }


}