import { consolelog, readFile, deleteFile } from '../../utils'
import { UploadBlob, ProductBlob, ModelBlob } from "../../lib";

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
            consolelog(process.cwd(), "uploadImage", error, false)
            return Promise.reject(error);
        }
    }

    /**
    * @method post
    * */
    async uploadJSON(payload) {
        try {
            let uploadStatus = await ModelBlob.upload(payload.name, payload.json);
            console.log("File Uploaded to -> ", uploadStatus.url);
            return uploadStatus;
        } catch (error) {
            consolelog(process.cwd(), "uploadJSON", error, false)
            return Promise.reject(error);
        }
    }
}

export const uploadController = new UploadController();