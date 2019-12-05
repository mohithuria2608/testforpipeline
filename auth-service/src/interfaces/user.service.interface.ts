declare namespace IUserServiceRequest {

    interface IId {
        id: string,
    }

    interface IUserData {
        id: string,
        cCode: string,
        phnNo: string,
        phnVerified: number,
        otp: number,
        otpExpAt: number,
        email: string,
        profileStep: number,
        language: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        deviceid: string,
        isLogin: number,
        socialKey: string,
        mdeium: string,
        // cartId: string
        createdAt: number,
    }
}
