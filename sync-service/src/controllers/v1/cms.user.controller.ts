import * as Constant from '../../constant'
import { consolelog, chunk } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from "fs";
import * as request from 'request-promise';

export class CmsUserController {

    constructor() { }

    async migrateUsersFromBlob(payload: any) {
        try {
            let url = `https://kfcprodnecmsimage.blob.core.windows.net/americana/user-json/user${payload.fileNo}.json`
            let users = await request.get(url, {});
            console.log(JSON.parse(users).length)
            ENTITY.UserE.postUser(JSON.parse(users));
            return {}
        } catch (error) {
            consolelog(process.cwd(), "migrateUsersFromBlob", error, false);
            return Promise.reject(error)
        }
    }

    /**
     * @method POST
     * */
    async migrateUsers(file: any) {
        try {
            let allowedTypes = ["application/json"];
            if (allowedTypes.includes(file.mimetype)) {
                let users: ICmsUserRequest.ICmsUser[]
                fs.readFile(file.path, 'utf8', (err, data) => {
                    if (err) throw err;
                    users = JSON.parse(data);
                    ENTITY.UserE.postUser(users);
                });
                fs.unlink(file.path, (error) => { });
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "migrateUsers", error, false);
            return Promise.reject(error)
        }
    }
}

export const cmsUserController = new CmsUserController();









 // console.log("files", JSON.stringify(payload))
            // let counter = 0
            // payload.files.forEach(file => {
            //     console.log("file.mimetype", JSON.stringify(file.mimetype))
            //     let allowedTypes = ["application/json"];
            //     if (allowedTypes.includes(file.mimetype)) {
            //         fs.readFile(file.path, 'utf8', (err, data) => {
            //             if (err) throw err;
            //             let users = JSON.parse(data);
            //             let chunkedArray = chunk(users, Constant.CONF.GENERAL.CHUNK_SIZE_USER_MIGRATION)
            //             chunkedArray.forEach(element => {
            //                 counter = counter + 1
            //                 fs.writeFile(`${__dirname + '/../../../exports/'}user_${counter}.json`, JSON.stringify(element), err => {
            //                     if (err) {
            //                         console.error(err)
            //                         return
            //                     }
            //                 })
            //             });
            //         });
            //         fs.unlink(file.path, (error) => { });
            //     }
            // })