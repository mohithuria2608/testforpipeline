declare namespace IUserGrpcRequest {

    export interface ICreateUserReq {
        request: ICreateUserDataOnCms
    }

    export interface ICreateUserDataOnCms {
        aerospikeId: string,
        lastname: string
        firstname: string
        email: string
        storeId: number
        websiteId: number,
        password: string
    }
}