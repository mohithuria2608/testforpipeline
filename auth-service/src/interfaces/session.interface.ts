declare namespace ISessionRequest {

    interface IFetchSession {
        userId: string,
        deviceid: string,
    }

    interface IFetchSessionRes {
        id: string,
        otp: number,
        otpExpAt: number,
        userId: string,
        isGuest: number,
        otpVerified: number,
        isLogin: number,
        createdAt: number,
        deviceid: string,
        language: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        updatedAt: number
    }
}
