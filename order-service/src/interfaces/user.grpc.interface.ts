declare namespace IUserGrpcRequest {

    interface IFetchAddress {
        userId: string,
        addressId: string,
        bin: string
    }

    interface IFetchAddressRes {
        id: string,
        description?: string,
        lat?: number,
        lng?: number,
        bldgName?: string,
        flatNum?: string,
        tag?: string,
        addressType: string,
        createdAt: number,
        updatedAt: number,
        sdmAddressRef: number,
        cmsAddressRef: number,
        sdmCountryRef: number,
        sdmStoreRef: number,
        sdmAreaRef: number,
        sdmCityRef: number,
    }
}