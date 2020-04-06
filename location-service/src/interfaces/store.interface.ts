declare namespace IStoreRequest {

    interface IStore {
        id?: string,
        storeId?: number,
        cityId?: number,
        countryId?: number,
        provinceId?: number,
        areaId?: number,
        streetId?: number,
        districtId?: number,
        mapId?: number,
        menuId?: number,
        name_en?: string,
        name_ar?: string,
        phone1?: string,
        phone2?: string,
        services?: {
            din: number,
            del: number,
            tak: number,
        },
        active?: number,
        geoFence?: any,
        location?: {
            description: string,
            latitude: number,
            longitude: number
        },
        address_en?: string,
        address_ar?: string,
        startTime?: string,
        endTime?: string,
        nextday?: number,
        isOnline?: boolean,
        sdmStoreId?: number,
        webMenuId?: number,
        menuTempId?: number,
    }

    interface IFetchStore {
        storeId: number,
        language: string,
    }

    interface IValidateCoordinates extends ICommonRequest.ICordinatesOpt { }
}
