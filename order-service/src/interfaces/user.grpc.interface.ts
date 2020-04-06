declare namespace IUserGrpcRequest {

    interface ICraeteUserOnSdmReq {
        userData: string,
        headers: string
    }

    interface ICraeteUserOnCmsReq {
        userData: string,
        headers: string
    }

    interface ICreatAddressOnCmsReq {
        userData: string,
        headers: string,
        asAddress: string
    }

    interface ICreatAddressOnSdmReq {
        userData: string,
        headers: string,
        asAddress: string
    }
    interface IFetchAddress {
        userId: string,
        addressId: string,
        bin: string
    }

    interface IFetchAddressRes {
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


}