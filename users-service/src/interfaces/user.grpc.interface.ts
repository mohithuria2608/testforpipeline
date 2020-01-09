declare namespace IUserGrpcRequest {

    interface IFetchUserByIdReq {
        request: IFetchUserById
    }

    interface IFetchUserById {
        id: string
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

    interface IFetchAddressByIdReq {
        request: IFetchAddressById
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
        storeId: number
    }

}
