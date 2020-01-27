declare namespace IUserchangeRequest {

    interface IUserchange {
        id?: string,
        parentId?: string,
        isGuest?: number,
        fullPhnNo?: string,
        cCode?: string,
        phnNo?: string,
        phnVerified?: number,
        otp?: number,
        otpExpAt?: number,
        otpVerified?: number,
        name?: string,
        email?: string,
        socialKey?: string,
        medium?: string,
        profileStep?: number
        cartId?: string,
        deleteUserId?: string,
    }

    interface IGetUserchange {
        userId: string
    }
}