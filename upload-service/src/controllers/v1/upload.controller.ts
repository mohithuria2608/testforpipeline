import { EnvModelBlob, TempBlob } from "../../lib";
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
            let allowedTypes = ["image/jpg", "image/jpeg"];
            if (allowedTypes.includes(image.mimetype)) {
                let imageData = await readFile(image.path);
                await deleteFile(image.path);
                return await TempBlob.upload(image.originalname, imageData);
            } else return { success: false, message: 'Invalid Image Type' };
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
            let responseData;
            switch (payload.mimetype) {
                // case "application/zip": {
                //     let stream = fs.createReadStream(payload.path).pipe(unzip.Extract({ path: __dirname + '/../../../../exports' }));
                //     await TempBlob.upload
                //     break;
                // }
                default: return { success: false, message: 'Invalid file type' }
            }
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