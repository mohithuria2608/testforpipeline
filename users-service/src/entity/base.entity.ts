import * as Constant from '../constant'
import * as mongoose from "mongoose";
import { consolelog } from '../utils';
import { authService, locationService, orderService } from '../grpc/client';
import * as Services from '../mongo/dao';

export class BaseEntity {
    public ObjectId = mongoose.Types.ObjectId;
    public DAOManager = new Services.DAOManager();
    public set: SetNames;
    constructor(set?) {
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

    /**
     * @description Create token from auth service
     */
    async createToken(dataToSend: IAuthGrpcRequest.ICreateTokenData) {
        try {
            return authService.createToken(dataToSend)
        } catch (error) {
            consolelog(process.cwd(), "createToken", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Validate latitude and longitude from location service
     */
    async fetchStore(storeId: number, language: string): Promise<IStoreGrpcRequest.IStore> {
        try {
            let store = await locationService.fetchStore({ storeId, language })
            return store
        } catch (error) {
            consolelog(process.cwd(), "fetchStore", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }


    /**
     * @description Validate latitude and longitude from location service
     */
    async validateCoordinate(lat: number, lng: number): Promise<IStoreGrpcRequest.IStore> {
        try {
            let validatedStore = await locationService.validateCoordinate({ lat, lng })
            return validatedStore
        } catch (error) {
            consolelog(process.cwd(), "validateCoordinate", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Create a default cart when a user is created with a default TTL from order service
     */
    async createDefaultCart(userId: string) {
        try {
            return await orderService.createDefaultCart({ userId })
        } catch (error) {
            consolelog(process.cwd(), "createDefaultCart", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    /**
     * @description : Load Test 
     * @param userId 
     */
    async getCartForLoadTest(userId: string) {
        try {
            return await orderService.getCart({ cartId: userId })
        } catch (error) {
            consolelog(process.cwd(), "getCartForLoadTest", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}