declare namespace IUserRequest {
    interface IRefreshToken extends ICommonRequest.IHeaders {
    }

    interface IPhone {
        cCode: string,
        phnNo: string
    }

    interface IAuthSendOtp extends ICommonRequest.IHeaders, IPhone {
    }

    interface IAuthVerifyOtp extends ICommonRequest.IHeaders, IPhone {
        otp: number
    }

    interface IUserData {
        id: string,
        cCode: string,
        phnNo: string,
        profileStep: number
        phnVerified: number,
        otp: number,
        otpExpAt: number,
        language: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        deviceid: string,
        isLogin: number,
        // cartId: string
    }
}