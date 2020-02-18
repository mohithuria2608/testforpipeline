declare namespace IUserGrpcRequest {

    interface IFetchSessionReq {
        request: IFetchSession
    }

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

    interface IFetchUserReq {
        request: IUserRequest.IFetchUser
    }

    interface IFetchAddressReq {
        request: IAddressRequest.IFetchAddress
    }

    interface IFetchAddressRes {
        id: string
        sdmAddressRef: number,
        cmsAddressRef: number,
        sdmStoreRef: number,
        sdmAreaRef: number,
        sdmCityRef: number,
        tag: string,
        bldgName: string,
        description: string,
        flatNum: string,
        addressType: string,
        lat: number,
        lng: number,
    }

}
