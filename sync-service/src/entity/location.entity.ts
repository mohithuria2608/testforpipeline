
'use strict';
import { consolelog } from '../utils'
import * as Constant from '../constant'
import { BaseEntity } from './base.entity'
import { startLocationForCMSSequence } from "../service";
import storeStatusSequence from "../service/statusSync/store.statusSync";

export class LocationClass extends BaseEntity {

    constructor() {
        super(Constant.SET_NAME.LOCATION)
    }

    /**
     * fetch location from SDM
     */
    async fetchLocationFromSDM() {
        try {
            await startLocationForCMSSequence();
            return
        } catch (error) {
            consolelog(process.cwd(), "fetchLocationFromSDM", error, false)
            return Promise.reject(error)
        }
    }

    /**
     * fetch stores from SDM
     */
    async fetchStoresStatusFromSDM() {
        try {
            return storeStatusSequence();
        } catch (error) {
            consolelog(process.cwd(), "fetchStoresStatusFromSDM", error, false)
            return Promise.reject(error)
        }
    }
}

export const LocationE = new LocationClass()
