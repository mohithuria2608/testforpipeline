declare namespace IMenuGrpcRequest {

    interface IFetchMenuReq {
        menuId: number,
        language: string
    }

    interface IFetchHiddenReq {
        menuId: number,
        language: string,
        type: string
    }

}
