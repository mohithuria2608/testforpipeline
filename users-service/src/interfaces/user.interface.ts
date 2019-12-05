declare namespace IUserRequest {

    interface IUserData {
        id: string,
        name: string,
        cCode: string,
        phnNo: string,
        phnVerified: number,
        otp: number,
        otpExpAt: number,
        email: string,
        profileStep: number,
        language: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        deviceid: string,
        isLogin: number,
        socialKey: string,
        medium: string,
        // cartId: string
        createdAt: number,
        address?: string[]
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
    interface IAuthSocial extends ICommonRequest.IHeaders, IPhone, IEmail {
        socialKey: string,
        medium: string,
        name: string,
    }

    interface IEditProf extends ICommonRequest.IHeaders {
        socialKey?: string,
        medium?: string,
        cCode?: string,
        phnNo?: string,
        email?: string,
        name?: string
    }
}