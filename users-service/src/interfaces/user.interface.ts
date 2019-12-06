declare namespace IUserRequest {

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
        address?: string[],
        session: {
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
    interface IRefreshToken extends ICommonRequest.IHeaders {
    }

    interface IPhone {
        cCode: string,
        phnNo: string
    }

    interface IEmail {
        email: string
    }
    interface IAuthSendOtp extends ICommonRequest.IHeaders, IPhone {
    }

    interface IAuthVerifyOtp extends ICommonRequest.IHeaders, IPhone {
        otp: number
    }
    interface IAuthSocial extends ICommonRequest.IHeaders, IEmail {
        socialKey: string,
        medium: string,
        name: string,
    }

    interface ICreateProfile extends ICommonRequest.IHeaders {
        socialKey?: string,
        medium?: string,
        cCode?: string,
        phnNo?: string,
        email?: string,
        name?: string
    }
}