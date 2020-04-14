'use strict';
import * as config from "config"
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'


export class OrderstatusClass extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.ORDERSTATUS)
    }

    async createTodayOrderStatus(payload: IOrderstatusRequest.ICreateTodayOrderStatus) {
        try {
            let listAppendArg: IAerospike.ListOperation = {
                order: true,
                bins: 1,
                set: this.set,
                key: "orderstatus",
                bin: "Pending",
                append: true
            }
            await Aerospike.listOperations(listAppendArg)
        } catch (error) {
            consolelog(process.cwd(), "createTodayOrderStatus", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async getTodayOrderStatus(payload: IOrderstatusRequest.ICreateTodayOrderStatus) {
        try {

        } catch (error) {
            consolelog(process.cwd(), "getTodayOrderStatus", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const OrderstatusE = new OrderstatusClass()
