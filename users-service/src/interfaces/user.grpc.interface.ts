declare namespace IUserGrpcRequest {

    interface IFetchUserReq {
        request: IUserRequest.IFetchUser
    }

    interface ISyncUserDataOnSdmReq {
        request: ISyncUserDataOnSdm
    }

    interface ISyncUserDataOnSdm {
    }

    interface ISyncUserDataOnCmsReq {
        request: ISyncUserDataOnCms
    }

    interface ISyncUserDataOnCms {
        action: ICommonRequest.IChange,
        aerospikeId: string,
        lastname: string
        firstname: string
        email: string
        storeId: number
        websiteId: number,
        password: string
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
