declare namespace IAddressRequest {

    interface IRegisterAddress extends ICommonRequest.IHeaders {
        areaId: string,
        bldgName: string,
        bldgNameUn: string,
        bldgNum: string,
        cityId: string,
        classId: string,
        countryId: string,
        userId: string,
        description: string,
        districtId: string,
        flatNum: string,
        id: string,
        floor: string,
        language: string,
        phoneAreaCode: string,
        phoneLookup: string,
        phoneNumber: string,
        phoneType: string,
        postalCode: string,
        provinceCode: string,
        sketch: string,
        streetId: string,
        useMap: number,
        createdBy: string,
        updatedBy: string
    }
}
