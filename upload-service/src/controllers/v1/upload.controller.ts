import * as Constant from '../../constant'
import { consolelog, readFile, deleteFile } from '../../utils'
import { UploadBlob, ProductBlob } from "../../lib";
import * as fs from 'fs'

export class UploadController {
    constructor() { }

    /**
    * @method GET
    * */
    async uploadImage(image: any) {
        try {
            if (image.mimetype === 'application/zip') {
                let zipData = await readFile(image.path);
                await UploadBlob.upload(image.originalname, zipData);
            } else {
                let imageData = await readFile(image.path);
                await ProductBlob.upload(image.originalname, imageData);
            }
            await deleteFile(image.path);
            return true;
        } catch (err) {
            consolelog("uploadImage", err, false)
            return Promise.reject(err);
        }
    }

    /**
    * @method GRPC
    * @param {string} country :current country of user
    * @param {boolean} isDefault :want to fetch default menu or not
    * */
    async grpcFetchMenu(payload: IMenuServiceRequest.IFetchMenuData) {
        try {
            let rawdata = fs.readFileSync(__dirname + '/../../../model/store.json', 'utf-8');
            let menu = JSON.parse(rawdata);
            return menu
        } catch (err) {
            consolelog("grpcFetchMenu", err, false)
            return Promise.reject(err)
        }
    }
}

export const uploadController = new UploadController();