declare namespace IUserRequest {

    interface IUserData {
        id?: string,
        username?: string,
        brand?: string,
        country?: string,
        email?: string,
        fullPhnNo?: string,
        cCode?: string,
        phnNo?: string,
        sdmUserRef?: number,
        cmsUserRef?: number,
        phnVerified?: number,
        name?: string,
        socialKey?: string,
        medium?: string,
        profileStep?: number,
        password?: string,
        cartId?: string,
        createdAt?: number,
    }
    interface IPhone {
        cCode: string,
        phnNo: string
    }

    interface IEmail {
        email: string
    }
    interface IRefreshToken {
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
        socialKey?: string,
        medium?: string,
        cCode?: string,
        phnNo?: string,
        email?: string,
        name?: string
    }

    interface IEditProfile {
        email?: string,
        name?: string,
        cCode?: string,
        phnNo?: string,
    }

    interface IFetchUser {
        userId?: string,
        cCode?: string,
        phnNo?: string,
    }

    interface ICheckUserOnCms {

    }

    interface ICheckUserOnSdm {

    }

}