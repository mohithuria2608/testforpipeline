declare namespace IUserGrpcRequest {

    interface ISyncToSdmUserDataReq {
        request: ISyncToSDMUserData
    }

    interface ISyncToSDMUserData {
        count?: number
    }

    interface ISyncToCmsUserDataReq {
        request: ISyncToCMSUserData
    }
    interface ISyncToCMSUserData {
        action: ICommonRequest.IChange
        count?: number
        aerospikeId: string,
        lastname: string
        firstname: string
        email: string
        storeId: number
        websiteId: number,
        password: string
    }
}