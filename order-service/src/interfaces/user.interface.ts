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
        password?: { iv: string, encryptedData: string },
        cartId?: string,
        createdAt?: number,
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