'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { consolelog, chunk } from '../utils'
import { kafkaService } from '../grpc/client'

export class UserEntity extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.USER)
    }

    async postUser(payload: ICmsUserRequest.ICmsUser[]) {
        try {
            if (payload && payload.length > 0) {
                let chunkedArray = chunk(payload, 5000)
                for (let i = 0; i < chunkedArray.length; i++) {
                    setTimeout(() => {
                        console.log("in action mode", chunkedArray[i].length, i)
                        if (chunkedArray[i] && chunkedArray[i].length > 0) {
                            for (const iterator of chunkedArray[i]) {
                                let userToSave = this.createUserObj(iterator)
                                if (userToSave && userToSave.id) {
                                    let userChange = {
                                        set: this.set,
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
                    }, i * 7000)
                }
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "postUser migration", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    createUserObj(payload: ICmsUserRequest.ICmsUser) {
        if (payload && payload.customerId) {
            let userId = this.ObjectId().toString();
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
                username: Constant.DATABASE.BRAND.KFC + "_" + payload.phone,
                cmsUserRef: parseInt(payload.customerId),
                sdmUserRef: parseInt(payload.SdmUserRef),
                sdmCorpRef: parseInt(payload.SdmCorpRef),
                migrate: 1
            }
            userObj['cmsAddress'] = payload.address
            return userObj
        } else {
            return {}
        }
    }
}

export const UserE = new UserEntity()
