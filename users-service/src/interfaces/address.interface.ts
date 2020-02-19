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
        sdmCountryRef: number,
        sdmStoreRef: number,
        sdmAreaRef: number,
        sdmCityRef: number,
    }

    interface IRegisterAddress {
        addressId?: string,
        storeId?: number,
        lat?: number,
        lng?: number,
        bldgName?: string,
        description?: string,
        flatNum?: string,
        tag?: string
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
        sdmStoreRef?: number,
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


