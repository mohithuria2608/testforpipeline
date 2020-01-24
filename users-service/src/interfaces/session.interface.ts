declare namespace ISessionRequest {

    interface ISession {
        id?: string,
        userId: string,
        isGuest?: number,
        otp?: number,
        otpExpAt?: number,
        otpVerified?: number,
        language?: string,
        country?: string,
        brand?: string,
        appversion?: string,
        devicemodel?: string,
        devicetype?: string,
        osversion?: string,
        deviceid?: string,
        createdAt?: number,
        sessionTime?: number,
        // ttl?: number
    }
}