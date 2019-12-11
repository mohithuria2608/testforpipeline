declare namespace IUserGrpcRequest {

    interface IId {
        id: string,
    }

    interface IUserData {
        id: string,
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
        address: {
            [deviceid: string]: IAddressRequest.IAddress
        },
        session: {
            [deviceid: string]: ISession
        },
        removeUserId?: string
    }

    interface ISession {
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
}
