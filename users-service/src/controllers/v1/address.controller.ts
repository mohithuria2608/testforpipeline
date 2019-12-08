import * as Constant from '../../constant'
import { consolelog, formatUserData } from '../../utils'
import { Aerospike } from '../../databases/aerospike'
import * as ENTITY from '../../entity'

export class AddressController {
    private uuidv1 = require('uuid/v1');
    constructor() { }

    /**
    * @method POST
    * @description REGISTER USER ADDRESS BY ID
    * */
    async registerAddress(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IRegisterAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            await ENTITY.UserE.addAddress(auth.userData, payload)
            // let id = this.uuidv1();
            // let dataToSave: IAddressRequest.IRegisterAddress = {
            //     id: id,
            //     areaId: payload.areaId,
            //     bldgName: payload.bldgName,
            //     bldgNameUn: payload.bldgNameUn,
            //     bldgNum: payload.bldgNum,
            //     cityId: payload.cityId,
            //     classId: payload.classId,
            //     countryId: payload.countryId,
            //     userId: payload.userId,
            //     description: payload.description,
            //     districtId: payload.districtId,
            //     flatNum: payload.flatNum,
            //     floor: payload.floor,
            //     language: payload.language,
            //     phoneAreaCode: payload.phoneAreaCode,
            //     phoneLookup: payload.phoneLookup,
            //     phoneNumber: payload.phoneNumber,
            //     phoneType: payload.phoneType,
            //     postalCode: payload.postalCode,
            //     provinceCode: payload.provinceCode,
            //     sketch: payload.sketch,
            //     streetId: payload.streetId,
            //     useMap: payload.useMap,
            //     createdBy: 'App',
            //     updatedBy: 'App'
            // };
            // let dataToUpdate = {
            //     address: auth.userData.address
            // }
            // dataToUpdate['address'][id] = dataToSave
            // let putArg: IAerospike.Put = {
            //     bins: dataToUpdate,
            //     set: 'user',
            //     key: auth.userData.id,
            //     update: true,
            // }
            // await Aerospike.put(putArg)
            let userObj = await ENTITY.UserE.getById({ id: auth.userData.id })
            return formatUserData(userObj, headers.deviceid)
        } catch (err) {
            consolelog("registerAddressById", err, false)
            return Promise.reject(err)
        }
    }

    /**
    * @method POST
    * @description UPDATE USER ADDRESS BY ID
    * */
    async updateAddressById(headers: ICommonRequest.IHeaders, payload: IAddressRequest.IRegisterAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            await ENTITY.UserE.updateAddress(auth.userData, payload)

            let userObj = await ENTITY.UserE.getById({ id: auth.userData.id })
            return formatUserData(userObj, headers.deviceid)
        } catch (err) {
            consolelog("updateAddressById", err, false)
            return Promise.reject(err)
        }
    }
}

export const addressController = new AddressController();