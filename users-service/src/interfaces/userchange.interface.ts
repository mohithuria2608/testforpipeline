declare namespace IUserchangeRequest {

    interface IUserchange {
        id?: string,
        isGuest?: number,
        fullPhnNo?: string,
        cCode?: string,
        phnNo?: string,
        otp?: number,
        otpExpAt?: number,
        otpVerified?: number,
        name?: string,
        email?: string,
        socialKey?: string,
        medium?: string,
        cartId?: string,
        deleteUserId?: string
    }

    interface IGetUserchange {
        userId: string
    }
}