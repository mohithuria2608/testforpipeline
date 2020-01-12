declare namespace IUserGrpcRequest {

    interface IFetchUserReq {
        request: IUserRequest.IFetchUser
    }

    interface IFetchAddressReq {
        request: IAddressRequest.IFetchAddress
    }

    interface IFetchAddressRes {
        id: string
        sdmAddressRef: number,
        cmsAddressRef: number,
        countryId: number,
        areaId: number,
        storeId: number,
        tag: string,
        bldgName: string,
        description: string,
        flatNum: string,
        addressType: string,
        lat: number,
        lng: number,
    }

}
