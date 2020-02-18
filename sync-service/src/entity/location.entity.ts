
'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { startLocationSequence } from "../service";
import { consolelog } from '../utils'

export class LocationClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []

    constructor() {
        super('location')
    }

    /**
     * fetch location from SDM
     */
    async fetchLocationFromSDM(payload) {
        try {
            let syncData = await startLocationSequence();
            return { success: true, data: syncData };
        } catch (error) {
            consolelog(process.cwd(), "fetchLocationFromSDM", error, false)
            return Promise.reject(error)
        }
    }
}

export const LocationE = new LocationClass()
