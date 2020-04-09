declare namespace IStoreRequest {

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

    interface IFetchStore {
        storeId: number,
        language: string,
    }

    interface IValidateCoordinates extends ICommonRequest.ICordinatesOpt { }

    interface IGetNearestStore extends ICommonRequest.ICordinatesOpt { }

}
