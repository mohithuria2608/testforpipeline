import { EnvModelBlob, ImageBlob } from "../../lib";
import * as decompress from "decompress";
import * as dcpTar from "decompress-tar";
import * as dcpUnz from "decompress-unzip";
import { consolelog, readFile, deleteFile } from '../../utils'

export class UploadController {
    constructor() { }

    /**
    * @method GET
    * */
    async uploadImage(image: any) {
        try {
            // if (image.mimetype === 'application/zip') {
            //     let zipData = await readFile(image.path);
            //     await UploadBlob.upload(image.originalname, zipData);
            // } else {
            //     let imageData = await readFile(image.path);
            //     await ProductBlob.upload(image.originalname, imageData);
            // }
            // await deleteFile(image.path);
            return true;
        } catch (error) {
            consolelog(process.cwd(), "uploadImage", error, false)
            return Promise.reject(error);
        }
    }

    /**
     * @method POST
     */
    async singleImage(image: any) {
        try {
            let allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif", "video/mp4"];
            if (allowedTypes.includes(image.mimetype)) {
                let imageData = await readFile(image.path);
                await deleteFile(image.path);
                return await ImageBlob.upload(image.originalname, imageData);
            } else return { success: false, message: 'Invalid Image Type' };
        } catch (error) {
            consolelog(process.cwd(), "singleImage", error, false);
            return { success: false, message: 'Internal Server Error' };
        }
    }

    /**
     * @method POST
     */
    async bulkImage(images: any[]) {
        try {
            let allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif", "video/mp4"];
            for (let image of images) {
                if (!allowedTypes.includes(image.mimetype)) {
                    return { success: false, message: 'Invalid Image Type' };
                }
            }
            for (let image of images) {
                let imageData = await readFile(image.path);
                await ImageBlob.upload(image.originalname, imageData);
                deleteFile(image.path);
            }
            return { success: true };
        } catch (error) {
            consolelog(process.cwd(), "singleImage", error, false);
            return { success: false, message: 'Internal Server Error' };
        }
    }

    /**
    * @method POST
    * */
    async singleFile(payload: any) {
        try {
            let allowedTypes = ["application/zip"];
            if (allowedTypes.includes(payload.mimetype)) {
                decompress(payload.path, __dirname + '/../../exports/extracts/', {
                    plugins: [dcpUnz()]
                }).then(async files => {
                    for (let file of files) {
                        let filePath = __dirname + '/../../exports/extracts/' + file.path;
                        let imageData = await readFile(filePath);
                        await ImageBlob.upload(file.path, imageData);
                        deleteFile(filePath);
                    }
                    deleteFile(payload.path);
                    return { success: true };
                });
            } else return { success: false, message: 'Invalid file type' }
        } catch (error) {
            consolelog(process.cwd(), "uploadImage", error, false)
            return { success: false, message: 'Internal Server Error' };
        }
    }

    /**
    * @method post
    * */
    async singleFileWithData(payload) {
        try {
            let uploadStatus = await EnvModelBlob.upload(payload.name, payload.json);
            consolelog(process.cwd(), "singleFileWithData success: ", uploadStatus.url, true);
            return uploadStatus;
        } catch (error) {
            consolelog(process.cwd(), "singleFileWithData", error, false)
            return Promise.reject(error);
        }
    }
}

export const uploadController = new UploadController();