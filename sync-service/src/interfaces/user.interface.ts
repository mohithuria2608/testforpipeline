declare namespace IUserRequest {

    interface IUserData extends TempAddressArray {
        id?: string,
        username?: string,
        brand?: string,
        country?: string,
        email?: string,
        fullPhnNo?: string,
        cCode?: string,
        phnNo?: string,
        sdmUserRef?: number,
        sdmCorpRef?: number,
        cmsUserRef?: number,
        phnVerified?: number,
        emailVerified?: number,
        name?: string,
        socialKey?: string,
        medium?: string,
        profileStep?: number,
        password?: string,
        cartId?: string,
        createdAt?: number,
    }

    interface TempAddressArray {
        asAddress?: IAddressRequest.IAddress[],
        cmsAddress?: any,
        sdmAddress?: any
    }
}