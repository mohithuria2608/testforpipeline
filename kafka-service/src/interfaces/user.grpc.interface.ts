declare namespace IUserGrpcRequest {

    interface ISyncToSdmUserDataReq {
        request: ISyncToSDMUserData
    }

    interface ISyncToSDMUserData {
        
    }
    
    interface ISyncToCmsUserDataReq {
        request: ISyncToCMSUserData
    }
    interface ISyncToCMSUserData {
        aerospikeId: string,
        lastname: string
        firstname: string
        email: string
        storeId: number
        websiteId: number,
        password: string
    }

    
}