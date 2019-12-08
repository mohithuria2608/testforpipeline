declare namespace IUserRequest {

    interface IPhone {
        cCode: string,
        phnNo: string
    }

    interface IEmail {
        email: string
    }
    interface IUserData {
        id: string,
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
        address: {
            [deviceid: string]: IAddressRequest.IRegisterAddress
        },
        session: {
            [deviceid: string]: ISession
        },
        removeUserId?: string
    }

    interface IUserUpdate {
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
        address?: {
            [deviceid: string]: IAddressRequest.IRegisterAddress
        },
        session?: {
            [deviceid: string]: ISession
        },
        removeUserId?: string
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
        cartId: string,
        createdAt: number,
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
        cartId?: string,
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
}