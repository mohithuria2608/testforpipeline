declare namespace IStoreGrpcRequest {

    interface IFetchStore {
        storeId: number,
        language: string,
        serviceType: string
    }
    interface IValidateCoordinateData extends ICommonRequest.ICordinatesOpt {
        serviceType: string
    }

    interface IStore {
        id: number,
        storeId: number,
        sdmStoreId: number,
        menuId: number,
        webMenuId: number,
        countryId: number,
        active: number,
        name_en: string,
        name_ar: string,
        phone1: string,
        phone2: string,
        email: string,
        services: {
            din: number,
            del: number,
            tak: number
        },
        location: {
            latitude: number,
            longitude: number,
            description: string
        },
        address_en: string,
        address_ar: string,
        startTime: string,
        endTime: string,
        nextday: number,
        menuTempId: number,
        description: string,
        areaId: number,
        cityId: number,
        provinceId: number,
        districtId: number,
        mapId: number,
        streetId: number,
        storeIdAs: string,
        geoFence?: any,
        isOnline?: boolean,
    }
}
