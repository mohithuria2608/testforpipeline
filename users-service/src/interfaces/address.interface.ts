declare namespace IAddressRequest {

    interface IAddress {
        id?: string,
        areaId?: string,
        bldgName?: string,
        bldgNameUn?: string,
        bldgNum?: string,
        cityId?: string,
        classId?: string,
        countryId?: string,
        userId?: string,
        description?: string,
        districtId?: string,
        flatNum?: string,
        floor?: string,
        language?: string,
        phoneAreaCode?: string,
        phoneLookup?: string,
        phoneNumber?: string,
        phoneType?: string,
        postalCode?: string,
        provinceCode?: string,
        sketch?: string,
        streetId?: string,
        useMap?: number,
        createdBy?: string,
        updatedBy?: string
    }
    interface IRegisterAddress {
        lat: number,
        lng: number,
        bldgName: string,
        description: string,
        flatNum: string,
        tag: string
    }

    interface IUpdateAddress {
        addressId: string
        bldgName?: string,
        description?: string,
        flatNum?: string,
        tag?: string
    }
}
