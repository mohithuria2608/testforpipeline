import * as Constant from '../../constant'
import { consolelog } from '../../utils'
import { Aerospike } from '../../databases/aerospike'
export class AddressController {
    private uuidv1 = require('uuid/v1');
    constructor() { }

    /**
    * @method POST
    * @description REGISTER USER ADDRESS BY ID
    * */
    async registerAddressById(payload: IAddressRequest.IRegisterAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let id = this.uuidv1();
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
            let putArg: IAerospike.ListOperation = {
                bins: dataToSave,
                bin: 'address',
                set: 'user',
                key: auth.userData.id
            }
            let registerUserAddress: IAddressRequest.IRegisterAddress = await Aerospike.listOperations(putArg)
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
    async updateAddressById(payload: IAddressRequest.IRegisterAddress, auth: ICommonRequest.AuthorizationObj) {
        try {
            let address = auth.userData.address
            if (address && address.length > 0) {
                address = address.map(elem => {
                    if (elem['id'] == payload.addressId) {
                        
                    }
                    return elem
                })
                let dataToUpdate = {
                    address: address
                }
                let putArg: IAerospike.Put = {
                    bins: dataToUpdate,
                    set: 'user',
                    key: auth.userData.id,
                    update: true,
                }
                let updateUser = await Aerospike.put(putArg)
                return updateUser
            } else {
                return {}
            }
        } catch (err) {
            consolelog("updateAddressById", err, false)
            return Promise.reject(err)
        }
    }
}

// local function addressId_filter(rec)
//         local address = rec['address']
//         local val = address['id']
//         if val == addressId then
//            return true
//         else
//            return false
//         end
//     end

//     rec['userId'] = newUserId
//     aerospike:update(rec)

export const addressController = new AddressController();