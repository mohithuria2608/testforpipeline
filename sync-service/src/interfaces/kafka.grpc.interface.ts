declare namespace IKafkaGrpcRequest {

    export interface ICreateUserReq {
        request: ICreateUserData
    }

    export interface ICreateUserData {
        aerospikeId: string,
        lastname: string,
        firstname: string,
        email: string,
        storeId: number,
        websiteId: number,
        password: string
    }

    export interface ICreateUserRes {
        aerospikeId: string,
        id: number
    }
}
