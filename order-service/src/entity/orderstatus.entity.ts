'use strict';
import * as config from "config"
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { consolelog } from '../utils'
import { Aerospike } from '../aerospike'
import { parse } from "path";
import { EALREADY } from "constants";


export class OrderstatusClass extends BaseEntity {
    constructor() {
        super(Constant.SET_NAME.ORDERSTATUS)
    }

    async bootstrapOrderstatuscron() {
        try {
            let orderstatus = {
                "0": [],
                "1": [],
                "96": [],
                "2": [],
                "8": [],
                "16": [],
                "32": [],
                "64": [],
                "128": [],
                "2048": [],
                "512": [],
                "256": [],
                "1024": [],
                "4096": [],
                "8192": [],
                "fake": []
            }
            let putArg: IAerospike.Put = {
                bins: orderstatus,
                set: this.set,
                key: "orderstatus",
                ttl: Constant.CONF.GENERAL.ORDERSTATUS_RESET,
                createOrReplace: true,
            }
            await Aerospike.put(putArg)
        } catch (error) {
            consolelog(process.cwd(), "bootstrapOrderstatuscron", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async appendTodayOrderStatus(payload: IOrderstatusRequest.IAppendTodayOrderStatus) {
        try {
            let listAppendArg: IAerospike.ListOperation = {
                order: true,
                set: this.set,
                key: "orderstatus",
                bin: payload.bin,
                bins: payload.value
            }
            if (typeof payload.value == "object")
                listAppendArg['appendItems'] = true
            else
                listAppendArg['append'] = true
            await Aerospike.listOperations(listAppendArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "appendTodayOrderStatus", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async removeTodayOrderStatus(payload: IOrderstatusRequest.IRemoveTodayOrderStatus) {
        try {
            let listAppendArg: IAerospike.ListOperation = {
                order: true,
                set: this.set,
                key: "orderstatus",
                bin: payload.bin,
                remByValue: true,
                value: payload.value
            }
            await Aerospike.listOperations(listAppendArg)
            return {}
        } catch (error) {
            consolelog(process.cwd(), "removeTodayOrderStatus", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async getTodayOrderStatus() {
        try {
            let getArg: IAerospike.Get = {
                set: this.set,
                key: "orderstatus"
            }
            let orderstatuscron = await Aerospike.get(getArg)
            if (orderstatuscron) {
                return orderstatuscron
            } else
                return {}
        } catch (error) {
            consolelog(process.cwd(), "getTodayOrderStatus", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async checkOrderstatusValidForCron(payload: IOrderSdmRequest.IGetActiveOrdersResObj[]) {
        try {
            let validSdmOrderStatus = [0, 1, 96, 2, 8, 16, 32, 64, 128, 512, 256, 1024, 4096, 8192]
            let finalProcessedPayload = []
            if (payload && payload.length > 0) {
                let prevOrderstatus = await this.getTodayOrderStatus()
                for (const elem of payload) {
                    if (prevOrderstatus.fake.indexOf(parseInt(elem.Key)) == -1) {
                        let bin = elem.Value
                        if (validSdmOrderStatus.indexOf(parseInt(bin)) >= 0) {
                            if (prevOrderstatus && prevOrderstatus[bin] && prevOrderstatus[bin].length > 0) {
                                if (prevOrderstatus[bin].indexOf(parseInt(elem.Key)) == -1)
                                    finalProcessedPayload.push(elem)
                            } else
                                finalProcessedPayload.push(elem)
                        }
                    }
                }
            }
            return finalProcessedPayload
        } catch (error) {
            consolelog(process.cwd(), "checkOrderstatusValidForCron", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }

    async updateOrderstatusForCron(payload: IOrderSdmRequest.IGetActiveOrdersResObj, order: IOrderRequest.IOrderData) {
        try {
            let validSdmOrderStatus = [0, 1, 96, 2, 8, 16, 32, 64, 128, 512, 256, 1024, 4096, 8192]
            let prevOrderstatus = await this.getTodayOrderStatus()
            let removeBin = [];
            validSdmOrderStatus.forEach(obj => {
                if (prevOrderstatus[obj.toString()] && prevOrderstatus[obj.toString()].length > 0) {
                    if (prevOrderstatus[obj.toString()].indexOf(parseInt(payload.Key)) >= 0) {
                        removeBin.push(obj.toString())
                    }
                }
            })
            if (removeBin && removeBin.length > 0) {
                for (const elem of removeBin) {
                    await this.removeTodayOrderStatus({ bin: elem, value: parseInt(payload.Key) })
                }
            }
            await this.appendTodayOrderStatus({ bin: payload.Value, value: parseInt(payload.Key) })
            return {}
        } catch (error) {
            consolelog(process.cwd(), "checkOrderstatusValidForCron", JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const OrderstatusE = new OrderstatusClass()