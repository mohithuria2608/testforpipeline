import { consolelog } from '../../utils'
import * as ENTITY from '../../entity'
import * as request from 'request-promise';
const fs = require('fs')
export class CmsUserController {

    constructor() { }

    async migrateUsersFromBlob(payload: any) {
        try {
            // https://kfcprodnecmsimage.blob.core.windows.net/americana/exports
            let counter = 0
            for (let i = payload.start; i <= payload.end; i++) {
                let timeout = counter * 20000
                console.log("i", timeout, i)
                setTimeout(async () => {
                    let url = `${payload.url}/user_${i}.json`
                    let users = JSON.parse(await request.get(url, {}));
                    // let users = JSON.parse(fs.readFileSync(`${process.cwd()}/src/user_${i}.json`, 'utf-8'))
                    if (users) {
                        console.log(users.length)
                        ENTITY.UserE.postUser(users);
                    }
                }, timeout)
                counter = counter + 1
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "migrateUsersFromBlob", error, false);
            return Promise.reject(error)
        }
    }
}

export const cmsUserController = new CmsUserController();