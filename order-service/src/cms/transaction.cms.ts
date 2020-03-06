'use strict';
import * as config from "config"
import * as Constant from '../constant'
import { BaseCMS } from './base.cms'
import { consolelog } from '../utils'

export class TransactionCMSEntity extends BaseCMS {
    constructor() {
        super()
    }

    async createTransaction(formObj: ITransactionCMSRequest.ICreateTransactionCms): Promise<any> {
        try {
            const headers = {};
            const form = formObj;
            const options: ICommonRequest.IReqPromiseOptions = {
                method: Constant.DATABASE.CMS.END_POINTS.CREATE_TRANSACTION.METHOD,
                url: config.get("cms.baseUrl") + Constant.DATABASE.CMS.END_POINTS.CREATE_TRANSACTION.URL,
                body: true
            }
            let cmsRes = await this.request(options, headers, form)
            if (cmsRes && cmsRes.length > 0) {
                if (cmsRes[0].success)
                    return cmsRes[0]
                else
                    Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
            }
            else
                Promise.reject(Constant.STATUS_MSG.ERROR.E500.IMP_ERROR)
        } catch (error) {
            consolelog(process.cwd(), 'createTransaction', JSON.stringify(error), false)
            return Promise.reject(error)
        }
    }
}

export const TransactionCMSE = new TransactionCMSEntity()
