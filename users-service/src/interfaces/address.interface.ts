declare namespace IAddressRequest {

    interface IAddressModel {
        delivery: [IAddress]
        pickup: [IAddress]
    }

    interface IAddress {
        id: string,
        description?: string,
        lat?: number,
        lng?: number,
        bldgName?: string,
        flatNum?: string,
        tag?: string,
        addressType: string,
        createdAt: number,
        updatedAt: number,
        sdmAddressRef: number,
        cmsAddressRef: number,
        countryId: number,
        storeId: number,
        areaId: number,
        cityId: number,
    }

    interface IRegisterAddress {
        addressId?: string,
        storeId?: number,
        lat?: number,
        lng?: number,
        bldgName?: string,
        description?: string,
        flatNum?: string,
        tag?: string,

        sdmAddressRef?: number,
        cmsAddressRef?: number,
    }

    interface IUpdateAddress {
        addressId: string
        lat?: number,
        lng?: number,
        bldgName?: string,
        description?: string,
        flatNum?: string,
        tag?: string,

        sdmAddressRef?: number,
        cmsAddressRef?: number,
    }

    interface ISyncOldAddress {
        addressId: string,
        storeId?: number,
        lat?: number,
        lng?: number,
        bldgName?: string,
        description?: string,
        flatNum?: string,
        tag?: string
    }
    interface IFetchAddress {
        userId: string,
        addressId?: string,
        bin: string
    }

    interface IDeleteAddress {
        addressId: string
    }
}


