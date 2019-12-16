declare namespace IUserGrpcRequest {

    export interface ICreateUserReq {
        request: ICreateUserData
    }


    export interface ICreateUserData {
        aerospikeId: string,
        lastname: string
        firstname: string
        email: string
        storeId: number
        websiteId: number,
        password: string
    }

    interface IUpdateUserInfo {
        aerospikeId: string
        id: number,
    }

}