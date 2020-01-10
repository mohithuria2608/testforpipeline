declare namespace IStoreGrpcRequest {

    interface IFetchStoreReq {
        request: IStoreRequest.IFetchStore
    }

    interface IValidateCoordinate {
        request: IValidateCoordinateData
    }

    interface IValidateCoordinateData extends ICommonRequest.ICordinatesOpt {
    }
}
