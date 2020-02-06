import * as request from "request";

/**
* makes a get request
* @param url
*/
export const getRequest = async function (url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        request.get(url, (error, res, body) => {
            if (error) reject(error);
            else resolve(body);
        });
    });
}