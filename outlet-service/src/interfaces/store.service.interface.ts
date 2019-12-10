declare namespace IStoreServiceRequest {
    interface IValidateCoordinate {
        request: IValidateCoordinateData
    }

    interface IValidateCoordinateData extends ICommonRequest.ICordinatesOpt {
    }
}
