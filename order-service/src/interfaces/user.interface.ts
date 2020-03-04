declare namespace IUserRequest {

    interface IUserData extends TempAddressArray {
        id?: string,
        sdmUserRef?: number,
        sdmCorpRef?: number,
        cmsUserRef?: number,
        // isGuest: number,
        name?: string,
        cCode?: string,
        phnNo?: string,
        phnVerified?: number,
        email?: string,
        profileStep?: number,
        socialKey?: string,
        medium?: string,
        createdAt?: number,
        cartId?: string,
        password?: string,
    }

    interface TempAddressArray {
        asAddress?: any,
        cmsAddress?: any,
        sdmAddress?: any
    }

    interface IFetchUser {
        userId?: string,
        cCode?: string,
        phnNo?: string,
        cartId?: string,
    }
}