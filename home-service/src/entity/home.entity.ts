'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class HomeClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [

    ]
    constructor() {
        super('home')
    }

    public homeSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
    })

    /**
     * @method BOOTSTRAP
     * */
    async postHome(data) {
        try {

            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                create: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            return {}
        }
    }
}

export const HomeE = new HomeClass()
