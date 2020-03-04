declare namespace IMenuGrpcRequest {

    interface IFetchMenu {
        request: IFetchMenuData
    }

    interface IFetchMenuData {
        menuId: number,
        language: string
    }

    interface IFetchMenuRes {
        menu: string,
    }

    interface IStoreAdd {
        coords: ICoords,
        country: number,
        area: number,
        service_fence: IServiceFence,
    }

    interface ICoords {
        type: string;
        coordinates: number[];
    }

    interface IServiceFence {
        type: string;
        coordinates: number[];
    }
}
