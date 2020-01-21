declare namespace IUserchangeRequest {

    interface IUserchange {
        id?: string,
        isGuest?: number,
        otp?: number,
        otpExpAt?: number,
        otpVerified?: number,
        name?: string,
        cCode?: string,
        phnNo?: string,
        email?: string,
        socialKey?: string,
        medium?: string,
        cartId?: string,
        deleteUserId?: string,
    }

    interface IGetUserchange {
        userId: string
    }
}