import * as Constant from '../../constant'
import { consolelog, readFile, deleteFile } from '../../utils'
import { UploadBlob, ProductBlob } from "../../lib";

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
        } catch (error) {
            consolelog(process.cwd(),"uploadImage", error, false)
            return Promise.reject(error);
        }
    }
}

export const uploadController = new UploadController();