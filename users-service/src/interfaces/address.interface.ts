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
        sdmStoreRef: number,
    }
    
    interface IRegisterAddress {
        lat: number,
        lng: number,
        bldgName: string,
        description: string,
        flatNum: string,
        tag: string
    }

    interface IUpdateAddress {
        addressId: string
        lat?: number,
        lng?: number,
        bldgName?: string,
        description?: string,
        flatNum?: string,
        tag?: string,
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


