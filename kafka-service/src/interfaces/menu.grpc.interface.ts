declare namespace IMenuGrpcRequest {

    interface ISyncToCmsMenuDataReq {
        request: ISyncToCMSMenuData
    }

    interface ISyncToCMSMenuData {
        action: ICommonRequest.IChange
        data: string
        count?: number
        type?: string
    }

    interface IUpdateMenuFromCMSReq {
        request: IUpdateMenuFromCMS
    }

    interface IUpdateMenuFromCMS {
        action: ICommonRequest.IChange
        data: string
        count?: number
        type?: string
    }
}