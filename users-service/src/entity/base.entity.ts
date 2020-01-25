import * as mongoose from "mongoose";
import { consolelog } from '../utils';
import { authService, locationService, orderService } from '../grpc/client';

export class BaseEntity {
    public ObjectId = mongoose.Types.ObjectId();
    public set: SetNames;
    constructor(set?) {
        this.set = set
    }

    /**
     * @description Create token from auth service
     */
    async createToken(dataToSend: IAuthGrpcRequest.ICreateTokenData) {
        try {
            return authService.createToken(dataToSend)
        } catch (error) {
            consolelog(process.cwd(), "createToken", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Validate latitude and longitude from location service
     */
    async validateCoordinate(lat: number, lng: number): Promise<IStoreGrpcRequest.IStore[]> {
        try {
            return await locationService.validateCoordinate({ lat, lng })
        } catch (error) {
            consolelog(process.cwd(), "validateCoordinate", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Create a default cart when a user is created with a default TTL from order service
     */
    async createDefaultCart(cartId: string, userId: string) {
        try {
            return await orderService.createDefaultCart({ cartId, userId })
        } catch (error) {
            consolelog(process.cwd(), "createDefaultCart", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description Update the default cart TTL from order service
     */
    async updateCartTTL(cartId: string, userId: string) {
        try {
            return await orderService.updateCartTTL({ cartId })
        } catch (error) {
            consolelog(process.cwd(), "updateCartTTL", error, false)
            return Promise.reject(error)
        }
    }
}