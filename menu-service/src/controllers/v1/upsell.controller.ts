import * as fs from 'fs';
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'

export class UpsellController {
    constructor() { }

    /**
    * @method POST
    * @description : Post bulk upsell data
    * */
    async postUpsell() {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/upsell.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            for (const iterator of menu) {
                ENTITY.UpsellE.postUpsell(iterator)
            }
            return {}
        } catch (err) {
            consolelog(process.cwd(), "postUpsell", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method GET
    * @param {string} menuId :  menu id
    * */
    async fetchUpsellProducts(headers: ICommonRequest.IHeaders, payload: IUpsellRequest.IFetchUpsell) {
        try {
            // return await ENTITY.UpsellE.getUpsellProducts(payload)
            return [
                {
                    "id": 1,
                    "position": 1,
                    "name": "Chocolate Chip Cookie",
                    "description": "",
                    "inSide": 0,
                    "finalPrice": 5.5,
                    "specialPrice": 4.5,
                    "typeId": "simple",
                    "catId": 41,
                    "metaKeyword": [
                        "Chocolate Chip Cookie"
                    ],
                    "bundleProductOptions": [],
                    "selectedItem": 0,
                    "configurableProductOptions": [],
                    "items": [],
                    "sku": "710003",
                    "imageSmall": "/d/u/dummy-product.png",
                    "imageThumbnail": "/d/u/dummy-product.png",
                    "image": "/d/u/dummy-product.png",
                    "taxClassId": 2,
                    "virtualGroup": 0,
                    "visibility": 4,
                    "associative": 0
                },
                {
                    "id": 2,
                    "position": 2,
                    "name": "Pepsi Large",
                    "description": "",
                    "inSide": 0,
                    "finalPrice": 15.5,
                    "specialPrice": 14.5,
                    "typeId": "simple",
                    "catId": 41,
                    "metaKeyword": [
                        "Pepsi Large"
                    ],
                    "bundleProductOptions": [],
                    "selectedItem": 0,
                    "configurableProductOptions": [],
                    "items": [],
                    "sku": "600004",
                    "imageSmall": "/d/u/dummy-product.png",
                    "imageThumbnail": "/d/u/dummy-product.png",
                    "image": "/d/u/dummy-product.png",
                    "taxClassId": 2,
                    "virtualGroup": 0,
                    "visibility": 4,
                    "associative": 0
                }
            ]
        } catch (err) {
            consolelog(process.cwd(), "fetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const upsellController = new UpsellController();