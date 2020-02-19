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
    private baseUrl = `https://bloobstorage.blob.core.windows.net`;
    private basePath: string;

    constructor(containerName: string, basePath: string) {
        const credentails = new StorageSharedKeyCredential("bloobstorage", "2JnjQ7U6rC4mFobPG6oq2ycUM/tr7zGmGH3GieJ+F3QEHxG6+XSPH3mPnYs3JlAB1TJoLT8KoJcrrlJsp7FP3A==");
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

export const ProductBlob = new BlobStorageClass("americana", "products/");
export const ModelBlob = new BlobStorageClass("americana", "models/");
export const EnvModelBlob = new BlobStorageClass("americana", config.get('env'));
export const TestBlob = new BlobStorageClass("americana", "test/");
export const UploadBlob = new BlobStorageClass("americana", "uploads/");

