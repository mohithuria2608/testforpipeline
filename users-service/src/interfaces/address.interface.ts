declare namespace IAddressRequest {

    interface IAddress {
        id: string,
        bldgName: string,
        description: string,
        flatNum: string,
        tag: string,

        phoneAreaCode: string,
        phoneLookup: string,
        phoneNumber: string,
        userId: string,

        language: string,

        areaId: number,
        cityId: number,
        countryId: number,
        districtId: number,
        provinceCode: number,
        streetId: number,

        classId: number,
        bldgNameUn: string,
        bldgNum: string,
        floor: string,
        phoneType: string,
        postalCode: string,
        sketch: string,
        useMap: number,
        createdBy: string,
        updatedBy: string,

        isActive: number
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

    interface IFetchAddress {

    }
}
