import * as Constant from '../constant'
import * as mongoose from "mongoose";
import * as Services from '../mongo/dao';
import { consolelog } from '../utils'
import { userService } from '../grpc/client'

export class BaseEntity {
    public ObjectId = mongoose.Types.ObjectId;
    public DAOManager = new Services.DAOManager();
    public set: SetNames;
    constructor(set) {
        this.set = set
    }

    async createOneEntityMdb(saveData: Object) {
        try {
            let data = await this.DAOManager.saveData(this.set, saveData)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity createOneEntityMdb', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async getOneEntityMdb(criteria: Object, projection: Object, option?) {
        try {
            if (option != undefined) {
                option['lean'] = true
            } else {
                option = { lean: true }
            }
            let data = await this.DAOManager.findOne(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity getOneEntityMdb', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async getMultipleMdb(criteria: Object, projection: Object, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.getData(this.set, criteria, projection, option)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity getMultipleMdb', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateOneEntityMdb(criteria: Object, dataToUpdate: Object, option?) {
        try {
            if (option == undefined)
                option = { new: true, lean: true }
            let data = await this.DAOManager.findAndUpdate(this.set, criteria, dataToUpdate, option)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity updateOneEntityMdb', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async aggregateMdb(pipeline, option?) {
        try {
            if (option == undefined)
                option = { lean: true }
            let data = await this.DAOManager.aggregateData(this.set, pipeline, option)
            return data
        } catch (error) {
            consolelog(process.cwd(), 'Base entity aggregateMdb', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async postCmsOrderPreHandler(payload: IOrderRequest.IPostOrderPreHookPayload) {
        try {
            let headers: ICommonRequest.IHeaders = payload.headers
            let userData: IUserRequest.IUserData = payload.userData
            let address: IUserGrpcRequest.IFetchAddressRes = payload.address
            let order: IOrderRequest.IOrderData = payload.order

            if (!userData.cmsUserRef || userData.cmsUserRef == 0)
                userData = await userService.createUserOnCms({ userData: JSON.stringify(userData), headers: JSON.stringify(headers) })

            let addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
            if (order.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP.AS)
                addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
            if (!address.cmsAddressRef || address.cmsAddressRef == 0) {
                await userService.creatAddressOnCms({ userData: JSON.stringify(userData), headers: JSON.stringify(headers), asAddress: JSON.stringify([address]) })
                address = await userService.fetchAddress({ userId: userData.id, addressId: address.id, bin: addressBin })
            }
            return { userData, address }
        } catch (error) {
            consolelog(process.cwd(), "postCmsOrderPreHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async postSdmOrderPreHandler(payload: IOrderRequest.IPostOrderPreHookPayload) {
        try {
            let headers: ICommonRequest.IHeaders = payload.headers
            let userData: IUserRequest.IUserData = payload.userData
            let address: IUserGrpcRequest.IFetchAddressRes = payload.address
            let order: IOrderRequest.IOrderData = payload.order

            if (!userData.sdmUserRef || userData.sdmUserRef == 0) {
                userData = await userService.createUserOnSdm({ userData: JSON.stringify(userData), headers: JSON.stringify(headers) })
            } else {
                if (userData.sdmCorpRef == 0 || userData.sdmCorpRef == null)
                    return Promise.reject(Constant.STATUS_MSG.ERROR.E455.SDM_INVALID_CORP_ID)
            }

            let addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.DELIVERY
            if (order.orderType == Constant.DATABASE.TYPE.ORDER.PICKUP.AS)
                addressBin = Constant.DATABASE.TYPE.ADDRESS_BIN.PICKUP
            if (!address.sdmAddressRef || address.sdmAddressRef == 0) {
                await userService.creatAddressOnSdm({ userData: JSON.stringify(userData), headers: JSON.stringify(headers), asAddress: JSON.stringify([address]) })
                address = await userService.fetchAddress({ userId: userData.id, addressId: address.id, bin: addressBin })
            }
            return { userData, address }
        } catch (error) {
            consolelog(process.cwd(), "postSdmOrderPreHandler", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}