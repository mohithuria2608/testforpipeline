import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as request from 'request-promise';

export class CmsUserController {

    constructor() { }

    async migrateUsersFromBlob(payload: any) {
        try {
            for (let i = payload.start; i <= payload.end; i++) {
                let timeout = 0
                if (i > 1)
                    timeout = i * 20000
                setTimeout(async () => {
                    console.log("i", i)
                    let url = `https://kfcprodnecmsimage.blob.core.windows.net/americana/exports/user_${i}.json`
                    let users = await request.get(url, {});
                    if (users) {
                        console.log(JSON.parse(users).length)
                        ENTITY.UserE.postUser(JSON.parse(users));
                    }
                }, timeout)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "migrateUsersFromBlob", error, false);
            return Promise.reject(error)
        }
    }
}

export const cmsUserController = new CmsUserController();