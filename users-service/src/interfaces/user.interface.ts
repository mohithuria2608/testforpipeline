declare namespace IUserRequest {

    interface IUserData {
        id: string,
        sdmUserRef: number,
        cmsUserRef: number,
        // isGuest: number,
        name: string,
        cCode: string,
        phnNo: string,
        phnVerified: number,
        email: string,
        profileStep: number,
        socialKey: string,
        medium: string,
        createdAt: number,
        cartId: string,
        password: string,
        changePhnNo: number,
        switchPhnNo: number,
    }
    interface IPhone {
        cCode: string,
        phnNo: string
    }

    interface IEmail {
        email: string
    }

    interface IUserUpdate {
        sdmUserRef?: number,
        cmsUserRef?: number,
        // isGuest?: number,
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
        changePhnNo?: number,
        switchPhnNo?: number
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
        userId: string
    }

    interface ICheckUserOnCms {

    }

    interface ICheckUserOnSdm {

    }

}