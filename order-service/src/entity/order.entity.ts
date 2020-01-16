'use strict';
import * as Joi from '@hapi/joi';
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog, sendSuccess } from '../utils'
import * as CMS from "../cms"
import { Aerospike } from '../aerospike'
import { kafkaService } from '../grpc/client';


export class OrderClass extends BaseEntity {

    protected modelName: SetNames;
    constructor() {
        super('order')
        this.modelName = 'order'
    }
    /**
    * @method INTERNAL
    */
    async syncOrder(payload) {
        try {
            let sdmOrderChange = {
                set: this.set,
                sdm: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            kafkaService.kafkaSync(sdmOrderChange)

            let cmsOrderChange = {
                set: this.set,
                cms: {
                    create: true,
                    argv: JSON.stringify(payload)
                }
            }
            kafkaService.kafkaSync(cmsOrderChange)
        } catch (error) {
            consolelog(process.cwd(), "syncOrder", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * @description sync user to cms and sdm coming from KAFKA
     * @param {IKafkaGrpcRequest.IKafkaBody} payload 
     */
    async syncOrderFromKafka(payload: IKafkaGrpcRequest.IKafkaBody) {
        try {
            let data = JSON.parse(payload.as.argv)
            if (payload.as.create || payload.as.update || payload.as.get) {
                if (payload.as.create) {

                }
                if (payload.as.update) {

                }
                if (payload.as.update) {

                }
            }
            if (payload.cms.create || payload.cms.update || payload.cms.get) {
                if (payload.cms.create) {

                }
            }
            if (payload.sdm.create || payload.sdm.update || payload.sdm.get) {
                if (payload.sdm.create)
                    this.createSdmOrder(data)
                if (payload.sdm.get)
                    this.getSdmOrder(data)
            }
            return {}
        } catch (error) {
            consolelog(process.cwd(), "syncFromKafka", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * */
    async createSdmOrder(payload: IOrderGrpcRequest.ICreateSdmOrder) {
        try {

            return {}
        } catch (error) {
            consolelog(process.cwd(), "createSdmOrder", error, false)
            return Promise.reject(error)
        }
    }

    /**
    * @method GRPC
    * @param {string} orderId : order id
    * @param {string} status : order status
    * @param {string} sdmOrderRef : sdm order id
    * @param {string} timeInterval : set timeout interval
    * */
    async getSdmOrder(payload: IOrderGrpcRequest.IGetSdmOrder) {
        try {
            setTimeout(async () => {
                //@todo :get order status from sdm 
                let dataToUpdate: ICartRequest.IUpdateCartData = {
                    status: payload.status,
                    updatedAt: new Date().getTime()
                }
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: this.set,
                    key: payload.cartId,
                    update: true,
                }
                await Aerospike.put(putArg)
                if (payload.status == Constant.DATABASE.STATUS.ORDER.CLOSED.SDM ||
                    payload.status == Constant.DATABASE.STATUS.ORDER.CANCELED.SDM ||
                    payload.status == Constant.DATABASE.STATUS.ORDER.FAILURE.SDM) {

                } else {
                    let orderChange = {
                        set: this.set,
                        sdm: {
                            get: true,
                            argv: JSON.stringify(payload)
                        }
                    }
                    kafkaService.kafkaSync(orderChange)
                }
            }, payload.timeInterval)

            return {}
        } catch (error) {
            consolelog(process.cwd(), "getSdmOrder", error, false)
            return Promise.reject(error)
        }
    }
}

export const OrderE = new OrderClass()
