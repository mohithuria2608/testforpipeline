declare namespace ICommonRequest {

    interface IHeaders {
        language: string,
        brand: string,
        country: string,
        appversion: string,
        devicemodel: string,
        devicetype: string,
        osversion: string,
        deviceid: string
    }

    interface AuthorizationObj {
        deviceid: string,
        devicetype: string,
        tokenType: string,
        id: string,
        isGuest: number
        userData: IUserRequest.IUserData,
        sessionTime: number
    }

    interface IPagination {
        page?: number,
    }

    interface ICordinatesReq {
        lat: number,
        lng: number
    }

    interface ICordinatesOpt {
        lat?: number,
        lng?: number
    }

    interface IId {
        id: string
    }
    interface IError {
        statusCode: number,
        httpCode: number,
        type: string,
        message: string
    }
}