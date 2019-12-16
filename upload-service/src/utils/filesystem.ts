import * as fs from "fs";

/**
* reads and returns the file data
* @param path
*/
export const readFile = async function (path: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

/**
* deletes the file
* @param path
*/
export const deleteFile = async function (path: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}