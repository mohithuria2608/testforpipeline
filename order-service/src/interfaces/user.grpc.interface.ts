declare namespace IUserGrpcRequest {
    interface IFetchAddressById {
        userId: string,
        addressId: string,
    }

    interface IFetchAddressByIdRes {
        id: string
        sdmAddressRef: number
        cmsAddressRef: number
        areaId: number
        storeId: number
    }
}