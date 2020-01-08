'use strict';
import * as Joi from '@hapi/joi';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog } from '../utils'
import { Aerospike } from '../databases/aerospike'

export class MenuClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []
    constructor() {
        super('menu')
    }


    public productSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        position: Joi.number().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        inSide: Joi.string().required(),
        finalPrice: Joi.number().required(),
        specialPrice: Joi.number().required(),
        typeId: Joi.string().valid("simple", "configurable", "bundle", "bundle_group").required(),
        selectedItem: Joi.number().required(),
        metaKeyword: Joi.array().items(Joi.string()),
        products: Joi.array().items(
            Joi.object().keys({
                id: Joi.number().required(),
                position: Joi.number().required(),
                name: Joi.string().required(),
                description: Joi.string().required(),
                inSide: Joi.string().required(),
                finalPrice: Joi.number().required(),
                specialPrice: Joi.number().required(),
                typeId: Joi.string().valid("bundle").required(),
                metaKeyword: Joi.array().items(Joi.string()),
                bundleProductOptions: Joi.array().items(
                    Joi.object().keys({
                        position: Joi.number().required(),
                        isDependent: Joi.number().required(),
                        maximumQty: Joi.number().required(),
                        minimumQty: Joi.number().required(),
                        title: Joi.string().required(),
                        ingredient: null,
                        type: Joi.string().valid("radio").required(),
                        productLinks: Joi.array().items(
                            Joi.object().keys({
                                position: Joi.number().required(),
                                price: Joi.number().required(),
                                id: Joi.number().required(),
                                name: Joi.string().required(),
                                selectionQty: Joi.number().required(),
                                subOptions: Joi.array().items(
                                    Joi.object().keys({
                                        price: Joi.number().required(),
                                        selected: Joi.number().required(),
                                        name: Joi.string().required()
                                    })),
                                selected: Joi.number().required(),
                                default: Joi.string().required(),
                                dependentSteps: Joi.array()
                            }))
                    })),
                selectedItem: Joi.number().required(),
                configurableProductOptions: null,
                products: null,
                sku: Joi.string().required(),
                imageSmall: Joi.string().required(),
                imageThumbnail: Joi.string().required(),
                image: Joi.string().required(),
                taxClassId: Joi.string().required(),
                virtualGroup: Joi.number().required(),
                visibility: Joi.number().required(),
                associative: Joi.string().required(),
            })),
        variants: Joi.array().items(
            Joi.object().keys({
                id: Joi.number().required(),
                title: Joi.string().required(),
                subtitle: Joi.string().required(),
                selIndex: Joi.number().required(),
                options: Joi.array().items(
                    Joi.object().keys({
                        id: Joi.number().required(),
                        position: Joi.number().required(),
                        title: Joi.string().required(),
                        isSelected: Joi.number().required()
                    }))
            })),
        bundleProductOptions: Joi.array().items(
            Joi.object().keys({
                position: Joi.number().required(),
                isDependent: Joi.number().required(),
                maximumQty: Joi.number().required(),
                minimumQty: Joi.number().required(),
                title: Joi.string().required(),
                ingredient: null,
                type: Joi.string().valid("radio", "checkbox").required(),
                productLinks: Joi.array().items(
                    Joi.object().keys({
                        position: Joi.number().required(),
                        price: Joi.number().required(),
                        id: Joi.number().required(),
                        name: Joi.string().required(),
                        selectionQty: Joi.number().required(),
                        subOptions: Joi.array().items(
                            Joi.object().keys({
                                price: Joi.number().required(),
                                selected: Joi.number().required(),
                                name: Joi.string().required()
                            })),
                        selected: Joi.number().required(),
                        default: Joi.string().required(),
                        dependentSteps: Joi.array()
                    }))
            })),
        configurableProductOptions: Joi.array().items(
            Joi.object().keys({
                id: Joi.number().required(),
                position: Joi.number().required(),
                title: Joi.string().required(),
                subtitle: Joi.string().required(),
                selIndex: Joi.number().required(),
                options: Joi.array().items(
                    Joi.object().keys({
                        isSelected: Joi.number().required(),
                        position: Joi.number().required(),
                        title: Joi.string().required(),
                        id: Joi.number().required()
                    }))
            })),
        sku: Joi.string().required(),
        imageSmall: Joi.string().required(),
        imageThumbnail: Joi.string().required(),
        image: Joi.string().required(),
        taxClassId: Joi.string().required(),
        virtualGroup: Joi.number().required(),
        visibility: Joi.number().required(),
        associative: Joi.string().required(),
    })

    public categorySchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        position: Joi.number().required(),
        name: Joi.string().required(),
        products: Joi.array().items(this.productSchema)
    })

    public menuSchema = Joi.object().keys({
        id: Joi.number().required().description("pk"),
        menuTempId: Joi.number().required(),
        conceptId: Joi.number().required(),
        menuId: Joi.number().required(),
        currency: Joi.string().required(),
        language: Joi.string().required(),
        updatedAt: Joi.number().required(),
        categories: Joi.array().items(this.categorySchema)
    })

    async post(data) {
        try {
            let putArg: IAerospike.Put = {
                bins: data,
                set: this.set,
                key: data.menuId,
                create: true,
            }
            await Aerospike.put(putArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "post menu", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} id : user id
    * */
    async getMenuById(id: number) {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: id
            }
            let menu = await Aerospike.get(getArg)
            if (menu && menu.id) {
                return menu
            } else
                return Promise.reject(Constant.STATUS_MSG.ERROR.E409.MENU_NOT_FOUND)
        } catch (error) {
            consolelog(process.cwd(), "getById", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} country :current country of user
    * @param {boolean} isDefault :want to fetch default menu or not
    * */
    async grpcFetchMenu(payload: IMenuGrpcRequest.IFetchMenuData) {
        try {
            let menuId = 5;
            return await this.getMenuById(menuId)
        } catch (err) {
            consolelog(process.cwd(), "grpcFetchMenu", err, false)
            return Promise.reject(err)
        }
    }

    /**
     * @method GRPC
     * @param {string} data :data of the menu
     */
    async syncMenuWithCMS(payload: IMenuGrpcRequest.ICMSMenuSync) {
        // call the CMS api request here
        return
    }

    /**
     * @method GRPC
     * @param {string} data :data of the menu
     */
    async updateMenuFromCMS(payload: IMenuGrpcRequest.IUpdateMenu) {
        let parsedPayload = JSON.parse(payload.data);
        return this.post(parsedPayload.data);
    }
}

export const MenuE = new MenuClass()
