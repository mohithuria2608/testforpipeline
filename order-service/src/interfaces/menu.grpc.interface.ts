declare namespace IMenuGrpcRequest {

    interface IFetchMenuData {
        menuId?: number,
        country: string,
        isDefault: boolean,
    }

    interface IFetchMenuRes {
        name_en: string,
        name_ar: string,
        address: IStoreAdd,
        id: number,
        menuTempId: number,
        conceptId: number,
        menuId: number,
        categories: [ICategory],
        updatedAt: number,
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

    interface ICategory {
        sequence: number,
        products: [IProduct],
        title_en: string,
        title_ar: string,
        id: number,
    }

    interface IProduct {
        quantity?: number
        catId?: number,
        sequence: number,
        steps: IStep[],
        price: number,
        promoId: number,
        description_en: string,
        itemType: string,
        title_en: string,
        description_ar: string,
        title_ar: string,
        id: number,
        image: IImage,
    }

    interface IStep {
        sequence: number,
        title_en: string,
        subtitle_ar: string,
        displayType: string,
        options: IOption[],
        title_ar: string,
        subtitle_en: string,
    }

    interface IImage {
        dimension: string,
        url: string,
        type: string,
        uploadBy: string
    }

    interface IOption {
        sequence: number,
        name_ar: string,
        price: number,
        promoId: number,
        id: number,
        name_en: string,
        selected: number,
        subOptions: ISubOptions[]
    }

    interface ISubOptions {
        price: number,
        selected: number,
        name_en: string
    }
}
