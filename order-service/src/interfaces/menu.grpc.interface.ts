declare namespace IMenuGrpcRequest {

    interface IFetchMenuData {
        menuId?: number,
        country: string,
        isDefault: boolean,
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
