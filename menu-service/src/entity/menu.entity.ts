'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'

export class MenuClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = [
        {
            set: this.set,
            bin: 'menuId',
            index: 'idx_' + this.set + '_' + 'menuId',
            type: "NUMERIC"
        },
        {
            set: this.set,
            bin: 'language',
            index: 'idx_' + this.set + '_' + 'language',
            type: "STRING"
        }
    ]
    constructor() {
        super('menu')
    }


    public productSchema = Joi.object().keys({
        id: Joi.number().required(),
    })

    public categorySchema = Joi.object().keys({
        id: Joi.number().required(),
        position: Joi.number().required(),
        name: Joi.string().required(),
        products: Joi.array().items(this.productSchema)
    })

    public menuSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        menuTempId: Joi.number().required(),
        conceptId: Joi.number().required(),
        menuId: Joi.number().required().description("sk"),
        currency: Joi.string().required(),
        language: Joi.string().required().description("sk"),
        updatedAt: Joi.number().required(),
        categories: Joi.array().items(this.categorySchema)
    })

    /**
     * @method BOOTSTRAP
     * */
    async postMenu(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.id,
                createOrReplace: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            return {}
        }
    }

    /**
    * @method GRPC
    * @param {string} id : user id
    * */
    async getMenu(payload: IMenuRequest.IFetchMenu) {
        try {
            let queryArg: IAerospike.Query = {
                udf: {
                    module: 'menu',
                    func: Constant.UDF.MENU.get_menu,
                    args: [payload.language],
                    forEach: true
                },
                equal: {
                    bin: "menuId",
                    value: payload.menuId
                },
                set: this.set,
                background: false,
            }
            let menu = await Aerospike.query(queryArg)
            if (menu && menu.length > 0) {
                return menu[0]
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.MENU_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getMenu", error, false)
            return Promise.reject(error)
        }
    }
}

export const MenuE = new MenuClass()
