declare namespace IUserchangeRequest {

    interface IUserchange extends IUserRequest.IUserData {
        isGuest?: number,
        otp?: number,
        otpExpAt?: number,
        otpVerified?: number,
        deleteUserId?: string,
        address?: IAddressRequest.IAddress
    }

    interface IGetUserchange {
        userId: string
    }
}