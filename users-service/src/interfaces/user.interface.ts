declare namespace IUserRequest {
    interface IRefreshToken extends ICommonRequest.IHeaders {
    }

    interface IPhone {
        countryCode: string,
        phoneNo: string
    }

    interface IAuthSendOtp extends ICommonRequest.IHeaders, IPhone {
    }

    interface IAuthVerifyOtp extends ICommonRequest.IHeaders, IPhone {
        otp: number
    }
}