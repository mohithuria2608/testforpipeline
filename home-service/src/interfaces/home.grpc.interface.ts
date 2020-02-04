declare namespace IHomeGrpcRequest {

    interface IFetchHome {
        request: IFetchHomeData
    }

    interface IFetchHomeData {
        language: string
    }

    interface IFetchHomeRes {
        home: string,
    }
}
