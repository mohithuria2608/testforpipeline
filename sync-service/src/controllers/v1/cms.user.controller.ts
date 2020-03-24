import * as Constant from '../../constant'
import { consolelog, chunk } from '../../utils'
import * as ENTITY from '../../entity'
import { kafkaService } from '../../grpc/client'

export class CmsUserController {

    constructor() { }

    /**
     * @method POST
     * @param {any} data
     * */
    async postUser(headers: ICommonRequest.IHeaders, payload: ICmsUserRequest.ICmsUserMigrate) {
        try {
            if (payload.data && payload.data.length > 0) {
                let chunkedArray = chunk(payload.data, Constant.SERVER.CHUNK_SIZE_USER_MIGRATION)
                console.log("chunkedArray", JSON.stringify(chunkedArray))
                chunkedArray.forEach(element => {
                    if (element && element.length > 0) {
                        for (const iterator of element) {
                            let userToSave = this.migrateUser(iterator)
                            console.log("userToSave", userToSave)
                            if (userToSave && userToSave.id) {
                                let userChange = {
                                    set: ENTITY.UserE.set,
                                    as: {
                                        create: true,
                                        argv: JSON.stringify(userToSave)
                                    },
                                    inQ: true
                                }
                                kafkaService.kafkaSync(userChange)
                            }
                        }
                    }
                });
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postUser migration", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    migrateUser(payload: ICmsUserRequest.ICmsUser) {
        if (payload && payload.customerId) {
            let userId = ENTITY.UserE.ObjectId().toString();
            let userObj: IUserRequest.IUserData = {
                id: userId,
                cartId: userId,
                profileStep: Constant.DATABASE.TYPE.PROFILE_STEP.FIRST,
                phnVerified: 0,
                brand: Constant.DATABASE.BRAND.KFC,
                country: Constant.DATABASE.COUNTRY.UAE,
                email: payload.email,
                name: payload.firstName + " " + payload.lastName,
                cCode: payload.phone.slice(0, 4),
                phnNo: payload.phone.slice(4),
                fullPhnNo: payload.phone,
                cmsUserRef: parseInt(payload.customerId),
                sdmUserRef: parseInt(payload.SdmUserRef),
                sdmCorpRef: parseInt(payload.SdmCorpRef),
            }
            userObj['cmsAddress'] = payload.address
            return userObj
        } else {
            return {}
        }
    }
}

export const cmsUserController = new CmsUserController();