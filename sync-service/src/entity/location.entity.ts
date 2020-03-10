
'use strict';
import { BaseEntity } from './base.entity'
import * as Constant from '../constant'
import { startLocationForCMSSequence } from "../service";
import { consolelog } from '../utils'

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
}

export const LocationE = new LocationClass()
