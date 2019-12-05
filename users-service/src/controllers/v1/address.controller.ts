import * as Constant from '../../constant'
import { consolelog, uuid } from '../../utils'
import * as ENTITY from '../../entity'
import { Aerospike } from '../../databases/aerospike'
const aerospike = require('aerospike')
let key = new aerospike.Key('americana', 'users', 10001)
export class AddressController {

    constructor() { }

    /**
    * @method POST
    * @description REGISTER USER ADDRESS BY ID
    * */
    async registerAddressById(payload: IAddressRequest.IRegisterAddress) {
        try {
            let id = uuid;
            let dataToSave: IAddressRequest.IRegisterAddress = {
                id: id,
                areaId: payload.areaId,
                bldgName: payload.bldgName,
                bldgNameUn: payload.bldgNameUn,
                bldgNum: payload.bldgNum,
                cityId: payload.cityId,
                classId: payload.classId,
                countryId: payload.countryId,
                userId: payload.userId,
                description: payload.description,
                districtId: payload.districtId,
                flatNum: payload.flatNum,
                floor: payload.floor,
                language: payload.language,
                phoneAreaCode: payload.phoneAreaCode,
                phoneLookup: payload.phoneLookup,
                phoneNumber: payload.phoneNumber,
                phoneType: payload.phoneType,
                postalCode: payload.postalCode,
                provinceCode: payload.provinceCode,
                sketch: payload.sketch,
                streetId: payload.streetId,
                useMap: payload.useMap,
                createdBy: 'App',
                updatedBy: 'App',
                appversion: payload.appversion,
                devicemodel: payload.devicemodel,
                devicetype: payload.devicetype,
                osversion: payload.osversion,
                deviceid: payload.deviceid,
                country: payload.country,
            };
            let putArg: IAerospike.Append = {
                bins: dataToSave,
                set: 'user',
                key: id,
                ttl: Constant.SERVER.INITIAL_ADDRESS_TTL,
            }
            let registerUserAddress: IAddressRequest.IRegisterAddress = await Aerospike.append(putArg)
            console.log("response from database:-", JSON.stringify(registerUserAddress), true);

        } catch (err) {
            consolelog("registerAddressById", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @description UPDATE USER ADDRESS BY ID
    * */
    async updateAddressById(payload: IAddressRequest.IRegisterAddress) {
        try {

        } catch (err) {
            consolelog("updateAddressById", err, false)
            return Promise.reject(err)
        }
    }
}

export const addressController = new AddressController();