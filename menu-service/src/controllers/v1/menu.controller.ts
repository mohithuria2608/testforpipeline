import * as Constant from '../../constant'
import { consolelog } from '../../utils'

export class MenuController {

    constructor() { }

    async fetchMenu(payload: IGuestMenuRequest.IGuestMenuFetch) {
        try {

            return {
                "name_en": "Super KFC",
                "name_ar": "Super KFC Arabic",
                "address": {
                    "coords": {
                        "type": "Point",
                        "coordinates": [
                            76.2867,
                            23.9231
                        ]
                    },
                    "country": 1,
                    "area": 4,
                    "service_fence": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            76.2867,
                            23.9231
                        ]
                    }
                },
                "id": 1,
                "menuTempId": 17,
                "conceptId": 3,
                "menuId": 1,
                "categories": [
                    {
                        "name": "Deals",
                        "sequence": 1,
                        "id": 13,
                        "products": [
                            {
                                "id": 50045,
                                "sequence": 1,
                                "name_en": "Twister BBQ Box",
                                "name_ar": "Twister BBQ Box Arabic",
                                "image": {
                                    "url": "",
                                    "type": "png/jpg",
                                    "size": "400x500",
                                    "other_meta_data": {}
                                },
                                "description_en": "1 Chicken Pc - original, 1 Twister etc",
                                "description_ar": "1 Chicken Pc - original, 1 Twister etc Arabic",
                                "itemType": "bundle",
                                "originalPrice": 22.00,
                                "hasDiscount": 1,
                                "discPrice": 20.00,
                                "steps": [
                                    {
                                        "sequence": 1,
                                        "title_en": "Chicken Flavour",
                                        "title_ar": "Chicken Flavor Arabic",
                                        "subtitle_en": "Choose your Chicken Flavour",
                                        "subtitle_ar": "Choose your Chicken Flavour Ar",
                                        "name_en": "Chicken Pc.",
                                        "name_ar": "Chicken Pc. Arabic",
                                        "quantity": 1,
                                        "customizations": [
                                            {
                                                "sequence": 1,
                                                "custType": "chicken_flavor",
                                                "displayType": "radio",
                                                "hasChild": 1,
                                                "options": [
                                                    {
                                                        "sequence": 1,
                                                        "name_en": "Chicken Pc - Original",
                                                        "name_ar": "Chicken Pc - Original Ar",
                                                        "price": 0,
                                                        "skuId": "SKU_101005",
                                                        "default": 1,
                                                        "hasChild": 0
                                                    },
                                                    {
                                                        "sequence": 2,
                                                        "name_en": "Chicken Pc - Spicy",
                                                        "name_ar": "Chicken Pc - Spicy Ar",
                                                        "price": 0,
                                                        "skuId": "SKU_101006",
                                                        "default": 0,
                                                        "hasChild": 0
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "sequence": 2,
                                        "title_en": "Twister Flavour",
                                        "title_ar": "Twister Flavour Arabic",
                                        "subtitle_en": "Choose your Twister Flavour",
                                        "subtitle_ar": "Choose your Twister Flavour Ar",
                                        "name_en": "Twister",
                                        "name_ar": "Twister Arabic",
                                        "quantity": 1,
                                        "customizations": [
                                            {
                                                "sequence": 1,
                                                "custType": "twister_flavor",
                                                "displayType": "radio",
                                                "hasChild": 1,
                                                "options": [
                                                    {
                                                        "sequence": 1,
                                                        "name_en": "Original",
                                                        "name_ar": "Original Ar",
                                                        "price": 0,
                                                        "skuId": "SKU_102005",
                                                        "default": 1,
                                                        "hasChild": 0
                                                    },
                                                    {
                                                        "sequence": 2,
                                                        "name_en": "Spicy",
                                                        "name_ar": "Spicy Ar",
                                                        "price": 0,
                                                        "skuId": "SKU_102006",
                                                        "default": 0,
                                                        "hasChild": 0
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "sequence": 3,
                                        "title_en": "Sandwich",
                                        "title_ar": "Sandwich Arabic",
                                        "subtitle_en": "Customize your condiments",
                                        "subtitle_ar": "Customize your condiments Ar",
                                        "name_en": "Sandwich",
                                        "name_ar": "Sandwich Arabic",
                                        "quantity": 1,
                                        "customizations": [
                                            {
                                                "custType": "condiments",
                                                "displayType": "checkbox",
                                                "sequence": 1,
                                                "hasChild": 1,
                                                "options": [
                                                    {
                                                        "sequence": 1,
                                                        "name_en": "American Cheese",
                                                        "name_ar": "American Cheese Ar",
                                                        "default": 0,
                                                        "hasChild": 1,
                                                        "displayType": "radio",
                                                        "options": [
                                                            {
                                                                "sequence": 1,
                                                                "name_en": "None",
                                                                "name_ar": "None",
                                                                "default": "1",
                                                                "price": 0,
                                                                "skuId": "NA",
                                                                "hasChild": 0
                                                            },
                                                            {
                                                                "sequence": 2,
                                                                "name_en": "Regular",
                                                                "name_ar": "Regular",
                                                                "default": 0,
                                                                "price": 2,
                                                                "skuId": "SKU_786273",
                                                                "hasChild": 0
                                                            },
                                                            {
                                                                "sequence": 1,
                                                                "name_en": "Large",
                                                                "name_ar": "Large",
                                                                "default": 0,
                                                                "price": 4,
                                                                "skuId": "SKU_786273",
                                                                "hasChild": 0
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "sequence": 2,
                                                        "name_en": "Lettuce",
                                                        "name_ar": "Lettuce Ar",
                                                        "price": 0,
                                                        "skuId": "SKU_102005",
                                                        "default": 1,
                                                        "hasChild": 0
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        } catch (err) {
            consolelog("fetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const menuController = new MenuController();