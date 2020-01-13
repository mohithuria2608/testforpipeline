declare namespace IUserRequest {

    interface IUserData {
        id: string,
        isGuest: number,
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
        session: {
            [deviceid: string]: ISession
        },
        mergeUserId?: string
    }

    interface ISession {
        isGuest: number,
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

    interface IFetchUser {
        userId: string,
    }
}