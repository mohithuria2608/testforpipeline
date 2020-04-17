/**
 * @file azure.image.storage
 * @description defines azure image storage
 * @created 2020-04-17 11:12:39
*/

import * as mime from "mime";
import * as config from "config";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

class BlobStorageClass {

    private client;
    private container;
    private containerName;
    private baseUrl = config.get("imageStorage.baseUrl");
    private basePath: string;

    constructor(containerName: string, basePath: string) {
        const credentails = new StorageSharedKeyCredential(config.get("imageStorage.accountName"), config.get("imageStorage.accessKey"));
        this.client = new BlobServiceClient(this.baseUrl, credentails);
        this.container = this.client.getContainerClient(containerName);
        this.containerName = containerName;
        this.basePath = basePath;
    }

    /**
     * uploads file to storage server
     * @param name - name of the file
     * @param data - content of the file
     */
    async upload(name: string, data: any) {
        const contentType = mime.getType(name);
        const blockBlobClient = this.container.getBlockBlobClient(`${this.basePath}${name}`);
        const uploadBlobResponse = await blockBlobClient.upload(data, data.length,
            { blobHTTPHeaders: { blobContentType: contentType } }
        );
        return {
            success: true,
            url: `${this.baseUrl}/${this.containerName}/${this.basePath}${name}`
        }
    }
}

export const ImageBlob = new BlobStorageClass(config.get("imageStorage.container"), `imagestemp/`);
