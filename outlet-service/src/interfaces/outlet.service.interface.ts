declare namespace IOutletServiceRequest {

    interface IGetOutletByCoord {
        request: ICoord
    }

    interface ICoord {
        lat: number,
        lng: number,
    }
}
