declare namespace IUserGrpcRequest {

    interface IUpdateUserInfoReq {
        request: IUpdateUserInfo
    }

    interface IUpdateUserInfo {
        aerospikeId: string
        id: number,
    }
}
