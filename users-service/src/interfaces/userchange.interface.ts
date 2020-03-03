declare namespace IUserchangeRequest {

    interface IUserchange extends IUserRequest.IUserData {
        isGuest?: number,
        otp?: number,
        otpExpAt?: number,
        otpVerified?: number,
        deleteUserId?: string,
        address?: IAddressRequest.IAddress,
        chngEmailCms?: number
        chngPhnCms?: number
        chngEmailSdm?: number
        chngPhnSdm?: number
    }

    interface IGetUserchange {
        userId: string
    }
}