declare namespace IUserRequest {

    interface IUserData {
        id: string,
        sdmUserRef: number,
        cmsUserRef: number,
        isGuest: number,
        name: string,
        cCode: string,
        phnNo: string,
        phnVerified: number,
        email: string,
        emailVerified: number,
        profileStep: number,
        socialKey: string,
        medium: string,
        createdAt: number,
        session: {
            [deviceid: string]: ISession
        },
        removeUserId?: string,
        cartId: string,
        password: string,
    }
    interface ISession {
        otp: number,
        otpExpAt: number,
        otpVerified: number,
        language: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        deviceid: string,
        isLogin: number,
        createdAt: number,
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
        isGuest?: number,
        name?: string,
        cCode?: string,
        phnNo?: string,
        phnVerified?: number,
        email?: string,
        emailVerified?: number,
        profileStep?: number,
        socialKey?: string,
        medium?: string,
        createdAt?: number,
        session?: {
            [deviceid: string]: ISession
        },
        removeUserId?: string,
        cartId?: string,
        password?: string,
    }

    interface ISessionUpdate {
        otp?: number,
        otpExpAt?: number,
        otpVerified?: number,
        language?: string,
        country?: string,
        appversion?: string,
        devicemodel?: string,
        devicetype?: string,
        osversion?: string,
        deviceid?: string,
        isLogin?: number,
        createdAt?: number,
    }

    interface IRefreshToken {
    }

    interface IAuthSendOtp extends IPhone {
    }

    interface IAuthVerifyOtp extends IPhone {
        otp: number
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
        name?: string
    }

    interface IFetchUser {
        userId: string
    }

    interface ICheckUserExistenceOnLegacy {
        checkCms: boolean,
        checkSdm: boolean,
        checkEmail: boolean,
        checkPhone: boolean,
        checkCombination: boolean,
        email: string,
        cCode: string,
        phnNo: string,
        isGuest: boolean
    }

    interface ICreateUserOnLegacy {

    }

}