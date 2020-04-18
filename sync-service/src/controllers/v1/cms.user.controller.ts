import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as fs from "fs";

export class CmsUserController {

    constructor() { }

    /**
     * @method POST
     * */
    async migrateUsers(file: any) {
        try {
            console.log("file.mimetype", file.mimetype)
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