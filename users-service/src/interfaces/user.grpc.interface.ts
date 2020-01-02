declare namespace IUserGrpcRequest {

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
}
