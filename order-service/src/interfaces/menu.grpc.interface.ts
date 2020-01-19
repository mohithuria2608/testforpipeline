declare namespace IMenuGrpcRequest {

    interface IFetchMenuReq {
        menuId?: number,
        country: string,
        isDefault: boolean,
    }

    interface IFetchMenuRes {
        menu: string,
    }
}
