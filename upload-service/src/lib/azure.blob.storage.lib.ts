/**
 * @file azure.blob.storage
 * @description defines azure blob storage
 * @created 2019-12-04 13:15:20
*/

import * as mime from "mime";
import * as config from "config";
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

class BlobStorageClass {

    private client;
    private container;
    private containerName;
    private baseUrl = config.get("blobStorage.baseUrl");
    private basePath: string;

    constructor(containerName: string, basePath: string) {
        const credentails = new StorageSharedKeyCredential(config.get("blobStorage.container"), config.get("blobStorage.accessKey"));
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
            url: `${this.baseUrl}/${this.containerName}/${this.basePath}${name}${config.get("blobBaseUrl.SASToken")}`
        }
    }
}

export const TempBlob = new BlobStorageClass(config.get("blobStorage.container"), `temp-images/`);
export const EnvModelBlob = new BlobStorageClass(config.get("blobStorage.container"), `${config.get('env')}\/`);

