declare namespace IUserGrpcRequest {

    interface IFetchUserById {
        id: string,
    }
    interface IFetchAddressById {
        userId: string,
        addressId: string,
    }

    interface IFetchAddressByIdRes {
        id: string
        sdmAddressRef: number
        cmsAddressRef: number
        areaId: number
        storeId: number,
        bldgName: string,
        description: string,
        flatNum: string,
        tag: string,
        addressType: string,
    }
}