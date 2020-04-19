import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
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
}

export const cmsUserController = new CmsUserController();