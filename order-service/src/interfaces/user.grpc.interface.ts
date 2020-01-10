declare namespace IUserGrpcRequest {

    interface IFetchAddressById {
        userId: string,
        addressId: string,
    }

    interface IFetchAddressByIdRes {
        id: string
        sdmAddressRef: number
        cmsAddressRef: number
        countryId: number,
        areaId: number
        storeId: number,
        bldgName: string,
        description: string,
        flatNum: string,
        tag: string,
        addressType: string,
        lat: string,
        lng: string,
    }
}