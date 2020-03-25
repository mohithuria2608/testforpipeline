
'use strict';
import { consolelog } from '../utils'
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { startLocationForCMSSequence } from "../service";
import storeSequence from "../service/locationSync/store";

export class LocationClass extends BaseEntity {
    public sindex: IAerospike.CreateIndex[] = []

    constructor() {
        super(Constant.SET_NAME.LOCATION)
    }

    /**
     * fetch location from SDM
     */
    async fetchLocationFromSDM(payload) {
        try {
            await startLocationForCMSSequence();
        } catch (error) {
            consolelog(process.cwd(), "fetchLocationFromSDM", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * fetch stores from SDM
     */
    async fetchStoresFromSDM(payload) {
        try {
            await storeSequence();
        } catch (error) {
            consolelog(process.cwd(), "fetchStoresFromSDM", error, false)
            return Promise.reject(error)
        }
    }
}

export const LocationE = new LocationClass()
