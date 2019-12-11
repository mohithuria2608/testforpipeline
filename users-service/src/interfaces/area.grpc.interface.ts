declare namespace IAreaGrpcRequest {
    interface IGetAreaByStoreIdData {
        storeId: number
    }

    interface IArea {
        id: number
        cityId: number,
        districtId: number,
        streetId: number,
        areaId: number,
        provinceId: number,
        countryId: number,
        name_en: string,
        name_ar: string,
        storeId: number
    }
}
