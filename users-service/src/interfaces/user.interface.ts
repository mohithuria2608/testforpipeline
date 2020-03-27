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
        createdAt?: number,
        headers?: ICommonRequest.IHeaders
    }

    interface TempAddressArray {
        asAddress?: IAddressRequest.IAddress[],
        cmsAddress?: any,
        sdmAddress?: any
    }
    interface IPhone {
        cCode: string,
        phnNo: string
    }

    interface IEmail {
        email: string
    }
    interface IAuthSendOtp extends IPhone {
    }

    interface IAuthVerifyOtp extends IPhone {
        otp: number,
        isGuest: number,
    }
    interface IAuthSocial extends IEmail {
        socialKey: string,
        medium: string,
        name: string,
    }

    interface ICreateProfile {
        cCode: string,
        phnNo: string,
        email: string,
        name: string
    }

    interface IEditProfile {
        name: string,
    }

    interface IFetchUser {
        userId?: string,
        cCode?: string,
        phnNo?: string,
    }

}