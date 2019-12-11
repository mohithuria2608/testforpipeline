declare namespace IStoreGrpcRequest {

    interface IValidateCoordinateData {
        lat: number,
        lng: number,
    }

    interface IStore {
        id: string,
        storeId: number,
        menuId: number,
        name_en: string,
        name_ar: string,
        phone1: string,
        phone2: string,
        services: {
            din: number,
            del: number,
            tak: number,
        },

        active: number,
        geoData: {
            address_en: string,
            address_ar: string,
            coords: any,
        },
        startTime: any,
        endTime: any,
        geoFence: any
    }
}
