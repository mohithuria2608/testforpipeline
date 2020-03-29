declare namespace IStoreGrpcRequest {

    interface IFetchStoreReq {
        request: IStoreRequest.IFetchStore
    }

    interface IValidateCoordinate {
        request: IValidateCoordinateData
    }

    interface IValidateCoordinateData extends ICommonRequest.ICordinatesOpt {
    }

    interface ISyncLocationFromCMSReq {
        request: any
    }

    interface IPostLocationDataToCMSReq {
        request: any
    }

    interface IPostStoreStatusToCMSReq {
        request: any
    }

    interface ISyncStoreStatusReq {
        request: any
    }
    interface IFetchPickupReq {
        request: IFetchPickup
    }

    interface IFetchPickup { }
}
